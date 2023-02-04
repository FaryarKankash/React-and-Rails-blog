require "jwt"

class AuthController < ApplicationController
    def signIn
        @user = User.find_by(email: params[:email])
        if @user
            #todo add hash auth
            # @isTrue = @user.authenticate(params[:password])
            if @user.password_digest == params[:password]
                token = jwt_encode(user_id: @user.id)
                render json: {"id": @user.id, "token": token}, status: :ok
            else
                render json: {"Error": "password is not valid!"}, status: 400
            end
        end
    end

    def me
        @user_id = jwt_decode(params[:jwt])[:user_id]
        @user = User.find(@user_id)
        if @user_id
            render json: @user
        else
            render json: {"Error": "jwt is not valid"}, status: 401
        end
    end
end