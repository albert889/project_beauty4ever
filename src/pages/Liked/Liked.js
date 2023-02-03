import React, { useEffect, useState, useRef, Fragment } from 'react';
import { connect } from 'react-redux';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Product from '../../components/Product';
import MySpinner from '../../components/MySpinner';
import './styles.css';

import { config } from '../../services/config';
import {child, get, ref} from "firebase/database";
import {RealDatabase} from "../../firebase/config";
import {getDataMakeup} from "../../fakebackend/axiosData";

const Liked = ({ liked: { likedProducts } }) => {
    const [dataLike, setDataLikes] = useState([]);
    const [data, setData] = useState([]);
    const [like, setLike] = useState([])

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
    }, [])

  return (
    <Fragment>
      <Row>
          {data.map((product, i) => {
              const indx = dataLike.findIndex((it => it.id === product.id))
                  if (indx >= 0) {
                      return <Product forProduct={true} dataLike={dataLike} product={product} key={i}/>
                  }


              }
          )}
      </Row>

      {likedProducts.length === 0 && (
        <Row className="justify-content-center">
          <h4>There are no liked products yet.</h4>
        </Row>
      )}
    </Fragment>
  );
};

export default connect(
  state => ({
    liked: state.likedReducer,
  }),
  {},
)(Liked);
