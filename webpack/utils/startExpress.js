import fs from 'fs';
import cp from 'child_process';
import webpack from 'webpack';
import path from 'path';
import debug from 'debug';
import browserSync from 'browser-sync';
import watch from 'node-watch';
import {assign, noop} from 'lodash';
import colors from 'colors/safe';

let server;
let started;
let serverReload;

const EXPRESS_PATH = path.join(__dirname, '../../server/main');

const startServer = () => {
  // Define `restartServer`
  const restartServer = () => {
    console.log(colors.rainbow('Rebuilding bundle'));
    webpack(require('../prod.config')).run((err, stats) => {
      console.log(colors.rainbow('Rebuilding express application'));
      serverReload = true;
      server.kill('SIGTERM');
      return startServer();
    });
  };

  // merge env for the new process
  const env = assign({}, {NODE_ENV: 'development'}, process.env);
  // start the server procress
  server = cp.fork(EXPRESS_PATH, { env });
  // when server is `online`
  server.once('message', (message) => {
    if (message.match(/^online$/)) {
      if (serverReload) {
        serverReload = false;
        browserSync.reload();
      }
      if (!started) {
        started = true;

        // Start browserSync
        browserSync({
          port: 3002,
          proxy: 'localhost:3001'
        });

        // Listen for `rs` in stdin to restart server
        console.log(colors.magenta('type `rs` in console for restarting express application'));
        process.stdin.setEncoding('utf8');
        process.stdin.on('data', function(data) {
          const parsedData = (data + '').trim().toLowerCase();
          if (parsedData === 'rs') return restartServer();
        });

        // Start watcher on server files
        // and reload browser on change
        watch(
          path.join(__dirname, '../../server'),
          (file) => {
            if (!file.match('webpack-stats.json') && !file.match('.swp') && !file.match(fs.lstatSync(file).isDirectory())) {
              console.log(colors.blue(`[File Changed] - ${file}`));
              return restartServer();
            }
            return noop();
          }
        );
      }
    }
  });
};

// kill server on exit
process.on('exit', () => server.kill('SIGTERM'));
export default () => !server ? startServer() : noop();
