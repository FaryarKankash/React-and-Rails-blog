require "jwt"

class UsersController < ApplicationController

    before_action :auth, only: [:readAllUser, :updateUser]

    def create
        @user = User.new
        @user.name = params[:name]
        @user.email = params[:email]
        #todo add hash password
        # @user.password_digest = BCrypt::Password.create(params[:password])
        @user.password_digest = params[:password]
        if @user.save
            render json: @user
        else
            render json: {"Error": "Error"}
        end

    end

    def readUser
        @user = User.find(params[:id])

        if @user
            render json: @user
        else
            render json: {"Error": "Error"}
        end
    end

    def readAllUser
        if @isAdmin
            @users = User.all
            if @users
                render json: @users
            else
                render json: {"Error": "Error"}
            end
        else
            render json: {"Error": "You are not admin!"}
        end
    end

    def updateUser
        @user = User.find(@user_id)
        if @user
            @user.name = params[:name]
            @user.email = params[:email]
            #todo add BCrypt
            # @user.password_digest = BCrypt::Password.create(params[:password])
            @user.password_digest = params[:password]
            if @user.save
                render json: @user
            end
        else
            render json: {"Error": "there is not any user with id #{params[:id]}"}
        end
    end

    private
    
    def auth
        @user_id = jwt_decode(request.authorization)[:user_id]
        @authUser = User.find(@user_id)
        if @authUser.admin == true
            @isAdmin = true
        else
            @isAdmin = false
        end
    end
end