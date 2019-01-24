<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBoardsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('boards', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->string('startPosition',255)->nullable($value = true);
          $table->dateTime('startTime')->nullable($value = true);
          $table->dateTime('endTime')->nullable($value = true);
          $table->unsignedInteger('idState');
          $table->foreign('idState')->references('id')->on('states')->onDelete('cascade');
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::dropIfExists('boards');
    }
}