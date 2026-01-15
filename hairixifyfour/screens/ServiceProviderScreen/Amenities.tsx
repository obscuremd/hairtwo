import { Car, Community, CreditCard, Puzzle, Wifi } from "iconoir-react";

export default function Amenities() {
  return (
    <div className="p-5 md:px-[68px] space-y-10">
      <p className=" text-xl md:text-[2rem] font-bold ">Amenities</p>
      <div className=" grid grid-cols-2 gap-10">
        <div className="flex gap-5 text-md">
          <Car color="#3AD688" /> <p>Parking Space</p>
        </div>
        <div className="flex gap-5 text-md">
          <Wifi color="#3AD688" /> <p>Wifi</p>
        </div>
        <div className="flex gap-5 text-md">
          <CreditCard color="#3AD688" /> <p>Credit Card Accepted</p>
        </div>
        <div className="flex gap-5 text-md">
          <Community color="#3AD688" />{" "}
          <p>Accessability for people with disabilities</p>
        </div>
        <div className="flex gap-5 text-md">
          <Puzzle color="#3AD688" /> <p>Child Friendly</p>
        </div>
      </div>
    </div>
  );
}
