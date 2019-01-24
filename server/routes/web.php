<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
   return 'Web Wervice Realizado con LSCodeGenerator';
});

$router->group(['middleware' => []], function () use ($router) {
   $router->post('/login', ['uses' => 'AuthController@login']);
   $router->post('/register', ['uses' => 'AuthController@register']);
   $router->post('/password_recovery_request', ['uses' => 'AuthController@passwordRecoveryRequest']);
   $router->get('/password_recovery', ['uses' => 'AuthController@passwordRecovery']);
});

$router->group(['middleware' => ['auth']], function () use ($router) {
   $router->post('/user/password_change', ['uses' => 'AuthController@passwordChange']);

   //CRUD Board
   $router->post('/board', ['uses' => 'BoardController@post']);
   $router->get('/board', ['uses' => 'BoardController@get']);
   $router->get('/board/paginate', ['uses' => 'BoardController@paginate']);
   $router->put('/board', ['uses' => 'BoardController@put']);
   $router->delete('/board', ['uses' => 'BoardController@delete']);

   //CRUD History
   $router->post('/history', ['uses' => 'HistoryController@post']);
   $router->get('/history', ['uses' => 'HistoryController@get']);
   $router->get('/history/paginate', ['uses' => 'HistoryController@paginate']);
   $router->put('/history', ['uses' => 'HistoryController@put']);
   $router->delete('/history', ['uses' => 'HistoryController@delete']);

   //CRUD Image
   $router->post('/image', ['uses' => 'ImageController@post']);
   $router->get('/image', ['uses' => 'ImageController@get']);
   $router->get('/image/paginate', ['uses' => 'ImageController@paginate']);
   $router->put('/image', ['uses' => 'ImageController@put']);
   $router->delete('/image', ['uses' => 'ImageController@delete']);

   //CRUD State
   $router->post('/state', ['uses' => 'StateController@post']);
   $router->get('/state', ['uses' => 'StateController@get']);
   $router->get('/state/paginate', ['uses' => 'StateController@paginate']);
   $router->put('/state', ['uses' => 'StateController@put']);
   $router->delete('/state', ['uses' => 'StateController@delete']);

   //CRUD User
   $router->post('/user', ['uses' => 'UserController@post']);
   $router->get('/user', ['uses' => 'UserController@get']);
   $router->get('/user/paginate', ['uses' => 'UserController@paginate']);
   $router->put('/user', ['uses' => 'UserController@put']);
   $router->delete('/user', ['uses' => 'UserController@delete']);
});
