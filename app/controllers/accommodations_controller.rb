class AccommodationsController < ApplicationController
    def create
        new_acc = Accommodation.create!(acc_params)
        render json: new_acc, status: :created
    end
    
    def update
        acc = Accommodation.find_by(id: params[:id])
        acc.update(acc_params)
        render json: acc, status: :ok
    end

    private 

    def acc_params
        params.permit(:id, :checkin, :checkout, :name, :address_1, :address_2, :city, :state, :zip, :country, :confirmation, :phone, :notes, :trip_id, :acc_type)
    end
end
