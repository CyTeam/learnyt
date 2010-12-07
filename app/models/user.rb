class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable, :lockable and :timeoutable
  devise :database_authenticatable, :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me, :locked_at, :role_texts

  # Authorization roles
  has_and_belongs_to_many :roles, :autosave => true
  scope :by_role, lambda{|role| include(:roles).where(:name => role)}
  attr_accessible :role_texts
  
  # Return current role name.
  def role_name
    # Just return _a_ role, no preferences or guarantees...
    roles.last.name
  end
  
  def role?(role)
    return !!self.roles.find_by_name(role.to_s)
  end

  def role_texts
    roles.map{|role| role.name}
  end
  
  def role_texts=(role_names)
    roles.delete_all
    for role_name in role_names
      roles.build(:name => role_name)
    end
  end
  
  # Person
  belongs_to :person
  attr_accessible :person_attributes
  accepts_nested_attributes_for :person
  validates_presence_of :person
  
  # Helpers
  def to_s
    person.try(:to_s) || email
  end
end
