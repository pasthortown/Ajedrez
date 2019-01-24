<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateImagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('images', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->string('filename',255)->nullable($value = true);
          $table->longText('attach')->nullable($value = true);
          $table->string('filetype',50)->nullable($value = true);
          $table->unsignedInteger('idUser');
          $table->foreign('idUser')->references('id')->on('users')->onDelete('cascade');
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::dropIfExists('images');
    }
}