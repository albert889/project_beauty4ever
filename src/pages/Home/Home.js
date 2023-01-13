import React, {useEffect, useState} from 'react';
import ContainerDimensions from 'react-container-dimensions';
import Carousel from 'react-bootstrap/Carousel';
import './styles.css';
import InfiniteScroll from "react-infinite-scroller";
import Product from "../../components/Product";
import {getDataMakeup} from "../../fakebackend/axiosData";

const Home = () => {
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);
  const [direction, setDirection] = useState(null);

  console.log(data)

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setDirection(e.direction);
  };
  const handleGetData = async () => {
      const response = await getDataMakeup();
      setData(response)
  }

  useEffect(() => {
      handleGetData();
  }, [])

  return (
    <>
        <ContainerDimensions>
            <Carousel
              activeIndex={index}
              direction={direction}
              onSelect={handleSelect}
              interval={null}
            >
              <Carousel.Item>
                <img
                  className="img-obj-fit"
                  src={require(`../../images/banner-1.jpeg`)}
                  alt="First slide"
                  style={{ width:"inherit" }}
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="img-obj-fit"
                  src={require(`../../images/banner_2.png`)}
                  alt="Second slide"
                  style={{ width:"inherit" }}
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="img-obj-fit"
                  src={require(`../../images/banner_3.png`)}
                  alt="Third slide"
                  style={{ width:"inherit" }}
                />
              </Carousel.Item>
            </Carousel>
        </ContainerDimensions>
        <div className="product">
            <InfiniteScroll
                className="row"
                pageStart={0}
                initialLoad={false}
            >
                {data.map((product, i) =>
                    <Product product={product} key={i} />
                )}
            </InfiniteScroll>
        </div>

    </>
  );
};


export default Home;


