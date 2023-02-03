import React, {useEffect, useState} from 'react';
import ContainerDimensions from 'react-container-dimensions';
import Carousel from 'react-bootstrap/Carousel';
import './styles.css';
import InfiniteScroll from "react-infinite-scroller";
import Product from "../../components/Product";
import {getDataMakeup} from "../../fakebackend/axiosData";
import {child, get, ref, remove, set} from 'firebase/database';
import {RealDatabase} from "../../firebase/config";
import {connect} from "react-redux";
import {likeProduct, unlikeProduct} from "../../store/actions/liked";
import {addProductToCart, removeProductFromCart} from "../../store/actions/cart";

const Home = () => {
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);
  const [direction, setDirection] = useState(null);
  const [dataLike, setDataLikes] = useState([]);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setDirection(e.direction);
  };

  const handleGetData = async () => {
      const response = await getDataMakeup();
      setData(response)
  }

    const getDataLikeV2 = async () => {
        const dbRef = ref(RealDatabase);
        get(child(dbRef, `liked/HmVao72bu7WnUbYR4ssTd34AMLp1/list`))
            .then(async snapshot => {
                if (snapshot.exists()) {
                    const oldData = snapshot.val();
                    const datas = [];
                    Object.keys(oldData).map(key => {
                        datas.push({
                            id: oldData[key].id,
                        });
                    });
                    const datafilter = data.filter((it => it.id === datas))
                    console.log(datafilter, "dat")
                    setDataLikes(datas);
                } else {
                }
            })
            .catch(error => {
                console.error(error);
            });
    };

  useEffect(() => {
      likeProduct([]);
      handleGetData();
      getDataLikeV2();
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
                {data.map((product, i) => {
                        const indx = dataLike.findIndex((it => it.id === product.id))
                        const lk = indx >= 0;
                        return <Product forProduct={true} dataLike={dataLike} product={{...product, like: lk}} key={i}/>

                    }
                )}
            </InfiniteScroll>
        </div>

    </>
  );
};

export default connect(
    state => ({
        liked: state.likedReducer,
        cart: state.cartReducer,
    }),
    {
        likeProduct,
        unlikeProduct,
        addProductToCart,
        removeProductFromCart,
    },
)(Home);


