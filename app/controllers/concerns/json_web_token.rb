require "jwt"

module JsonWebToken

    def jwt_encode(pyload)
        hmac_secret = 'my$ecretK3y'
        token = JWT.encode pyload, hmac_secret, 'HS256'
        return token
    end

    def jwt_decode(token)
        hmac_secret = 'my$ecretK3y'
        decoded_token = JWT.decode token, hmac_secret, true, { algorithm: 'HS256' }
        return ActiveSupport::HashWithIndifferentAccess.new(decoded_token[0])
    end
end