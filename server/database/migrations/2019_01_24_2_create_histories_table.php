<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('histories', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->string('move',20)->nullable($value = true);
          $table->string('turn',20)->nullable($value = true);
          $table->unsignedInteger('idBoard');
          $table->foreign('idBoard')->references('id')->on('boards')->onDelete('cascade');
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::dropIfExists('histories');
    }
}