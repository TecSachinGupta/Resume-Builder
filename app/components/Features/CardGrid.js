/**
 *
 * CardGrid
 *
 */

import React, { memo } from 'react';
import cx from 'classnames';

// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function CardGrid(props) {
  // const rowCount = props.templateItems.length / 3 ;
  return (
    <main className="py-4">
      <div className="px-4">
        <div className="block md:flex flex-wrap justify-between md:-mx-2">
          {props.templateItems.map(item => (
            <div className="w-full md:w-1/3 md:mx-2 mb-4 md:mb-0">
              <div className="bg-white rounded-lg overflow-hidden shadow relative">
                <div className="group ">
                  <img
                    className="h-56 w-full object-cover object-center hover:opacity-0"
                    src={item.imageUrl}
                    alt=""
                  />
                </div>
                <div className="p-4 h-auto md:h-40 lg:h-48">
                  <h1 className="text-gray-900 font-bold text-xl md:text-base lg:text-lg">
                    {item.title}
                  </h1>
                  <div className="flex mt-3">
                    <h1 className="flex-grow item-center my-auto text-gray-700 font-bold text-sm ">
                      {item.price}
                    </h1>
                    <div className="flex item-center">
                      {[1, 2, 3, 4, 5].map(e => (
                        <span
                          className={cx('star ml-1', 'text-xl', {
                            activeStar: e <= parseInt(item.rating),
                          })}
                        >
                          &#9733;
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-gray-600 text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className="w-full lg:w-1/3 md:mx-2 mb-4 md:mb-0">
            <div className="bg-white rounded-lg overflow-hidden shadow relative">
              <img
                className="h-56 w-full object-cover object-center"
                src="https://images.unsplash.com/photo-1465188162913-8fb5709d6d57?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                alt=""
              />
              <div className="p-4 h-auto md:h-40 lg:h-48">
                <h1 className="text-gray-900 font-bold text-xl md:text-base lg:text-lg">
                  Template 2
                </h1>
                <div className="flex mt-3">
                  <h1 className="flex-grow item-center my-auto text-gray-700 font-bold text-sm ">
                    Free
                  </h1>
                  <div className="flex item-center">
                    <span className="star ml-1 text-xl activeStar">
                      &#9733;
                    </span>
                    <span className="star ml-1 text-xl ">&#9733;</span>
                    <span className="star ml-1 text-xl ">&#9733;</span>
                    <span className="star ml-1 text-xl ">&#9733;</span>
                    <span className="star ml-1 text-xl ">&#9733;</span>
                  </div>
                </div>
                <p className="mt-2 text-gray-600 text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit In
                  odit exercitationem fuga id nam quia
                </p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/3 md:mx-2 mb-4 md:mb-0">
            <div className="bg-white rounded-lg overflow-hidden shadow relative">
              <img
                className="h-56 w-full object-cover object-center"
                src="https://images.unsplash.com/photo-1467238307002-480ffdd260f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                alt=""
              />
              <div className="p-4 h-auto md:h-40 lg:h-48">
                <h1 className="text-gray-900 font-bold text-xl md:text-base lg:text-lg">
                  Template 3
                </h1>
                <div className="flex mt-3">
                  <h1 className="flex-grow item-center my-auto text-gray-700 font-bold text-sm ">
                    Free
                  </h1>
                  <div className="flex item-center">
                    <span className="star ml-1 text-xl activeStar">
                      &#9733;
                    </span>
                    <span className="star ml-1 text-xl activeStar">
                      &#9733;
                    </span>
                    <span className="star ml-1 text-xl ">&#9733;</span>
                    <span className="star ml-1 text-xl ">&#9733;</span>
                    <span className="star ml-1 text-xl ">&#9733;</span>
                  </div>
                </div>
                <p className="mt-2 text-gray-600 text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit In
                  odit exercitationem fuga id nam quia
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

CardGrid.propTypes = {};

export default memo(CardGrid);