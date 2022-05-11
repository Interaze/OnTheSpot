import React, { useEffect, useState, useRef } from 'react'
import {BiArrowBack} from 'react-icons/bi'
import {Link} from 'react-router-dom';
import $ from 'jquery';

function Analytics( {currentMission} ) {

  const [itemList, setItemList] = useState([]);

  useEffect(() => {

    async function fetchData() {

      const data = await $.getJSON('/api/load-map/?mapPath=/code/data/graph'); // Path to api including HARDCODED graph example

      setItemList(data['waypoints']); // Set list to mostrar using waypoints array extracted from graph JSON
    }

    fetchData();

    }, [currentMission, setItemList]);

  return (
    <div className="landing-page">
      <iframe src="./Vtk" className="vtk-window"></iframe>
      <div className="verticle-menu">
        {itemList.map(item => ( <a key={item['annotations']['name']} href="/#">{item['annotations']['name']}</a> ))}
      </div>

      <Link to="/" className="settings-button"><BiArrowBack color='white' fontSize='1.5rem'/></Link>
      <span></span>
    </div>
  )
}

export default Analytics