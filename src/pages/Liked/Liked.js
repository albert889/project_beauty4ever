import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';

import Row from 'react-bootstrap/Row';
import Product from '../../components/Product';
import './styles.css';
import {child, get, ref} from "firebase/database";
import {RealDatabase} from "../../firebase/config";
import {getDataMakeup} from "../../fakebackend/axiosData";
import {likeProduct, unlikeProduct} from "../../store/actions/liked";
import {addProductToCart, removeProductFromCart} from "../../store/actions/cart";

const Liked = ({liked}) => {
    const [dataLike, setDataLikes] = useState([]);
    const [data, setData] = useState([]);

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
                    setDataLikes(datas);
                }
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleGetData = async () => {
        const response = await getDataMakeup();
        setData(response)
    }

    useEffect(() => {
        handleGetData();
        getDataLikeV2();
    }, [liked])

  return (
    <Fragment>
      <Row>
          {data.map((product, i) => {
              const indx = dataLike.findIndex((it => it.id === product.id))
                  if (indx >= 0) {
                      return <Product forProduct={true} dataLike={dataLike} product={{...product, like: true}} key={i}/>
                  }
              }
          )}
      </Row>
    </Fragment>
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
)(Liked);
