class CalendarController < ApplicationController
  
  # Actions
  def index
    @month = (params[:month] || (Time.zone || Time).now.month).to_i
    @year = (params[:year] || (Time.zone || Time).now.year).to_i

    @shown_month = Date.civil(@year, @month)
    @first_day_of_week = 1
    @event_strips = Event.accessible_by(current_ability).event_strips_for_month(@shown_month, @first_day_of_week)
  end

  def view
    @event = Event.find(params[:event])
  end

  def day
  end
end
