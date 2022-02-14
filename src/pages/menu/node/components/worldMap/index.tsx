import React, { useCallback, useState, useMemo, useEffect } from 'react';
import ReactFauxDOM from 'react-faux-dom';
import * as d3 from 'd3';

import staticMapSrc from './StaticMap.svg';

// Styles
import './index.less';
const WorldMap = (props: any) => {
  const calculateWidth = (windowWidth: any) => {
    const svgWidthOversizeFactor = 1.7; // remove a constant amount for the chrome that surronds the map.
    const sidebarAndPadding = 350;
    const availableWidth = windowWidth - sidebarAndPadding;
    const width = availableWidth * svgWidthOversizeFactor;
    if (width > 3000) {
      return 3000;
    }
    // if the map gets too small it becomes illegible. There will be some map cropping on mobile.
    if (width < 700) {
      return 700;
    }

    return width;
  };

  const calculateHeight = (width: number) => {
    if (width > 960) {
      if (window.innerHeight < 940) {
        return (window.innerHeight - 180) * 0.6;
      }
      return width * 0.273;
    }

    return width * 0.5;
  };
  const GeoPath = ({ width, height, children }: any) => {
    // https://github.com/d3/d3-geo/blob/master/README.md#geoEquirectangular
    const projection = d3
      .geoEquirectangular()
      .scale(height / Math.PI)
      .translate([width / 2, height / 2])
      .precision(0.1);
    // https://github.com/d3/d3-geo/blob/master/README.md#paths
    const path = d3.geoPath().projection(projection);

    return children({ path });
  };
  const [width, setWidth] = useState(calculateWidth(window.innerWidth));
  const [height, setHeight] = useState(calculateHeight(width));
  const [peers, setPeers] = useState(4);
  useEffect(() => {
    const debouncedHandleResize = () => {
      const width = calculateWidth(window.innerWidth);
      console.log(width);

      setWidth(width);
      setHeight(calculateHeight(width));
    };

    window.addEventListener('resize', debouncedHandleResize);

    return () => window.removeEventListener('resize', debouncedHandleResize);
  });
  const MapPins = ({
    width,
    height,
    path,
    peersCoordinates,
    handleMouseEnter,
    handleMouseLeave,
  }: any) => {
    const el = d3
      .select(ReactFauxDOM.createElement('svg'))
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`);
    peersCoordinates = [
      {
        coordinates: [-99.69, 35.69],
        peerIds: ['12D3KooWGu6QDRJzvWKcqQjZYreYY6NX1wCQ5LPFNLcZmzTCbaMM'],
      },
    ];
    peersCoordinates.forEach(({ peerIds, coordinates }: any) => {
      el.append('path')
        .datum({
          type: 'Point',
          coordinates: coordinates,
        })
        // .attr('d', 'M1128.4266349683332,220.0753014758333m0,5a5,5 0 1,1 0,-10a5,5 0 1,1 0,10z')
        .attr(
          'd',
          path.pointRadius(() => getDotsSize(peerIds.length)),
        )
        .attr('fill', () => getDotsColor(peerIds.length))
        .attr('class', 'mapDot');
    });

    return el.node().toReact();
  };
  const getDotsSize = (numberOfDots: any) => {
    if (numberOfDots < 10) return 5;
    if (numberOfDots < 100) return 8;
    return 10;
  };
  const getDotsColor = (numberOfDots: Number) => {
    if (numberOfDots < 10) return 'rgba(00, 184, 176, 0.4)';
    if (numberOfDots < 100) return 'rgba(00, 184, 176, 0.6)';
    if (numberOfDots < 200) return 'rgba(00, 184, 176, 0.8)';
    return 'rgba(00, 184, 176, 1)';
  };

  // Just the dots on the map, this gets called a lot.

  return (
    <div className="mapBox">
      <div
        className="relative "
        style={{
          width: width,
          height,
          background: `transparent url(${staticMapSrc}) left no-repeat`,
          backgroundSize: 'auto 100%',
        }}
      >
        <GeoPath width={width} height={height}>
          {({ path }: any) => <MapPins width={width} height={height} path={path} />}
        </GeoPath>
        {/* {selectedPeers?.peerIds && (
              <Popover show={!!(selectedPeers.top && selectedPeers.left)} top={selectedPeers.top} left={selectedPeers.left} align='bottom'
                handleMouseEnter={handlePopoverMouseEnter} handleMouseLeave={handleMapPinMouseLeave}>
                <PeerInfo ids={selectedPeers.peerIds} t={t} />
              </Popover>)
            } */}
      </div>
      <div className="peersText" style={{ position: 'absolute', top: height - 150, left: '100' }}>
        <span>{peers} peers</span>
      </div>
      <div style={{ position: 'absolute', top: height - 150, left: width / 2 + 150 }}>
        <div className="mapDotExplanText">
          <div
            className="mapDotExplanation mr1"
            style={{ width: '8px', height: '8px', backgroundColor: getDotsColor(1) }}
          ></div>
          1-10
        </div>
        <div className="mapDotExplanText">
          <div
            className="mapDotExplanation ml3 mr1"
            style={{ width: '8px', height: '8px', backgroundColor: getDotsColor(50) }}
          ></div>
          10-100
        </div>
        <div className="mapDotExplanText">
          <div
            className="mapDotExplanation ml3 mr1"
            style={{ width: '8px', height: '8px', backgroundColor: getDotsColor(110) }}
          ></div>
          100-200
        </div>
        <div className="mapDotExplanText">
          <div
            className="mapDotExplanation ml3 mr1"
            style={{ width: '8px', height: '8px', backgroundColor: getDotsColor(210) }}
          ></div>
          200+
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
