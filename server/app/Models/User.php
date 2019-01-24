<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
       'name','email','password','api_token',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
       'password','api_token',
    ];

    function Boards()
    {
       return $this->belongsToMany('App\Models\Board')->withTimestamps();
    }

    function Image()
    {
       return $this->belongsTo('App\Models\Image');
    }

}