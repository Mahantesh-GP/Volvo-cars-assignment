import React, { useState, useEffect, useRef } from "react";
import { useReel } from "@volvo-cars/react-headless";
import { IconButton } from "@volvo-cars/react-icons";
import { CarsCard } from "./CarsCard";
import { ICarDetail } from "./models/ICarDetail";
import { Select } from "@volvo-cars/react-forms";

export const CarsList: React.FC = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const [cars, setCars] = useState([]);
  const [scrollLeft, setScroll] = useState(0);
  let frontArrowDisabled = false;
  let backArrowDisabled = true;
  const [carsIm, setCarsImmutable] = useState([]);
  const [uniqueBodyTypes, setUniqueBodyTypes] = useState([]);
  const { activeIndex } = useReel({
    ref: divRef,
  });

  if (activeIndex === 0) {
    backArrowDisabled = true;
    frontArrowDisabled = false;
  } else if (activeIndex > 0 && activeIndex < cars.length) {
    backArrowDisabled = false;
    frontArrowDisabled = false;
  } else {
    frontArrowDisabled = true;
    backArrowDisabled = false;
  }

  const handleChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filteredCars = carsIm.filter(
      (car: ICarDetail) => car.bodyType == event.target.value
    );
    setCars(filteredCars);
  };

  const handleReelClick = (type: React.UIEvent<HTMLDivElement>) => {
    const scrollContainer = type.currentTarget;
    setScroll(scrollContainer.scrollLeft);
  };

  const reelButtonClick = (btnType: String) => {
    const scrollContainer = divRef.current;
    const itemWidth = scrollContainer!.clientWidth / 2;

    if (btnType == "forward") {
      scrollContainer?.scrollTo({
        left: scrollLeft + itemWidth,
        behavior: "smooth",
      });
    } else {
      scrollContainer?.scrollTo({
        left: scrollLeft - itemWidth,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const fetchData = fetchDataFromJson(
      setCars,
      setCarsImmutable,
      setUniqueBodyTypes
    );
    fetchData();
  }, []);

  return (
    <>
      <div className="grid justify-center">
        <Select
          label="Search Body Type"
          onChange={handleChangeFilter}
          name="Search"
        >
          {uniqueBodyTypes.map((car: ICarDetail) => (
            <option key={car.id} value={car.bodyType}>
              {car.bodyType}
            </option>
          ))}
        </Select>
      </div>
      <section className="no-scroll">
        <div
          ref={divRef}
          onScroll={handleReelClick}
          className="reel gap-x-5 p-16 scrollbar-none"
          tabIndex={0}
        >
          {cars.map((car: ICarDetail) => (
            <CarsCard carItems={car} key={car.id} />
          ))}
        </div>
        <div className="reel-indicators" />
        <div className="flex gap-x-8 mr-16 mt-16 justify-start element-to-hide">
          <IconButton
            aria-label="forward"
            variant="outlined"
            iconName="navigation-chevronback"
            onClick={() => reelButtonClick("backward")}
            tabIndex={-1}
          />
          <IconButton
            aria-label="backward"
            variant="outlined"
            iconName="navigation-chevronforward"
            tabIndex={-1}
            onClick={() => reelButtonClick("forward")}
          />
        </div>
      </section>
    </>
  );
};
function fetchDataFromJson(
  setCars: React.Dispatch<React.SetStateAction<never[]>>,
  setCarsImmutable: React.Dispatch<React.SetStateAction<never[]>>,
  setUniqueBodyTypes: React.Dispatch<React.SetStateAction<any>>
) {
  return async () => {
    const res = await fetch("api/cars.json");
    if (res.ok) {
      const json = await res.json();
      setCarsImmutable(JSON.parse(JSON.stringify(json)));
      setCars(json);

      const uniqueItems = Array.from(new Set(json.map((x: any) => x.bodyType)))
        .map((s: any) => {
          return json.find((p: any) => p.bodyType == s);
        })
        .filter((a: any) => a !== undefined);

      setUniqueBodyTypes(uniqueItems);
    } else {
      console.error("Failed to fetch data");
    }
  };
}
