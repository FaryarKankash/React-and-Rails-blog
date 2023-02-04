class PostsController < ApplicationController
    before_action :auth, only: [:create, :delete, :update, :indexUser]

    def create
        if @authUser
            @post = Post.new
            @post.title = params[:title]
            @post.content = params[:content]
            @post.image = params[:image]
            @post.description = params[:description]
            @post.user = @authUser
            if @post.save
                render json: @post
            else
                render json: {"Error": "Error"}
            end
        end
    end

    def index
        @posts = Post.select(:id, :title, :image, :description)
        if @posts
            render json: @posts
        else
            render json: {"Error": "there is not any post!"}, status: 204
        end
    end

    def show 
        begin
            @post = Post.find(params[:id])
                render json: @post
        rescue
            render json: {"Error": "there is not any post with id #{params[:id]}"}, status: 203
        end
    end

    def delete
        @post = Post.find(params[:id])
        if @authUser == @post.user
            @post.destroy
            render json: {"success": "post with id #{params[:id]} deleted!"}, status: :ok
        else
            render json: {"Error": "you cant delete this post!"}, status: 203
        end
    end

    def update
        @post = Post.find(params[:id])
        if @authUser == @post.user
            @post.title = params[:title]
            @post.content = params[:content]
            @post.description = params[:description]
            @post.image = params[:image]
            @post.user = @authUser
            if @post.save
                render json: @post, status: :ok
            end
        else
            render json: {"Error": "you cant update this post!"}, status: 203
        end
    end

    def indexUser
        #for returning all of records we have to use where
        @posts = Post.where(user_id: @authUser.id).select(:id, :title, :image, :description)
        render json: @posts 
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