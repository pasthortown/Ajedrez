<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Exception;
use App\Board;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class BoardController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(Board::get(),200);
       } else {
          return response()->json(Board::findOrFail($id),200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(Board::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $board = Board::create([
             'startPosition'=>$result['startPosition'],
             'startTime'=>$result['startTime'],
             'endTime'=>$result['endTime'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($board,200);
    }

    function put(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $board = Board::where('id',$result['id'])->update([
             'startPosition'=>$result['startPosition'],
             'startTime'=>$result['startTime'],
             'endTime'=>$result['endTime'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($board,200);
    }

    function delete(Request $data)
    {
       $result = $data->json()->all();
       $id = $result['id'];
       return Board::destroy($id);
    }
}