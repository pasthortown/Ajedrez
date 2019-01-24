<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('users', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->string('name',255)->nullable($value = true);
          $table->string('email',255)->nullable($value = true);
          $table->string('password',255)->nullable($value = true);
          $table->string('api_token',255)->nullable($value = true);
          $table->unique(['email']);
       });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
       Schema::dropIfExists('users');
    }
}