<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Board extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
       'startPosition','startTime','endTime',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
       
    ];

    function State()
    {
       return $this->hasOne('App\Models\State');
    }

    function Histories()
    {
       return $this->hasMany('App\Models\History');
    }

    function Users()
    {
       return $this->belongsToMany('App\Models\User')->withTimestamps();
    }

}