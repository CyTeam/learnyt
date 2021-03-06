# Users Controller
#
# Provides a user/account management interface.
class UsersController < AuthorizedController
  # Scopes
  has_scope :tagged_with

  def create
    @user = User.new(params[:user])
    @user.person = Person.create(:type => params[:user]['role_texts'].first.to_s.camelcase) if params[:user]['role_texts'].first

    create!{ users_path }
  end
  
  # Actions
  def update
    @user = User.find(params[:id])
    
    # Don't try to update password if not provided
    if params[:user][:password].blank?
      [:password, :password_confirmation, :current_password].collect{|p| params[:user].delete(p) }
    end

    update!
  end

  def unlock
    @user = resource
    @user.unlock_access!
    
    redirect_to users_path, :notice => t('crud.flash.unlocked', :user => @user.to_s)
  end

  def current
    redirect_to current_user
  end
end
