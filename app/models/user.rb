class User < ApplicationRecord
    has_many :posts
    has_secure_password validations: false

    validates_uniqueness_of :email, message: "must be unique"
    validates :email, presence: true
    validates :name, presence: true
    validates :password_digest, presence: true
end
