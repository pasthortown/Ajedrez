<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Exception;
use App\Image;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ImageController extends Controller
{
    function get(Request $data)
    {
       $id = $data['id'];
       if ($id == null) {
          return response()->json(Image::get(),200);
       } else {
          return response()->json(Image::findOrFail($id),200);
       }
    }

    function paginate(Request $data)
    {
       $size = $data['size'];
       return response()->json(Image::paginate($size),200);
    }

    function post(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $image = Image::create([
             'filename'=>$result['filename'],
             'attach'=>$result['attach'],
             'filetype'=>$result['filetype'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($image,200);
    }

    function put(Request $data)
    {
       try{
          DB::beginTransaction();
          $result = $data->json()->all();
          $image = Image::where('id',$result['id'])->update([
             'filename'=>$result['filename'],
             'attach'=>$result['attach'],
             'filetype'=>$result['filetype'],
          ]);
          DB::commit();
       } catch (Exception $e) {
          return response()->json($e,400);
       }
       return response()->json($image,200);
    }

    function delete(Request $data)
    {
       $result = $data->json()->all();
       $id = $result['id'];
       return Image::destroy($id);
    }
}