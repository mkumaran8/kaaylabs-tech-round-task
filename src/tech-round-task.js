import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactPaginate from 'react-paginate';

const TechRoundTask = () => {

  useEffect(() => {
    loadBeerDetails(1);
  }, []);

  const params = useParams();

  const [beerInfo, updateBeerInfo] = useState([]);
  const [eventType, updateEventType] = useState("");

  const loadBeerDetails = (selectedPage) => {
    const url = "https://api.punkapi.com/v2/beers?page=" + selectedPage + "&per_page=10";
    axios.get(url)
      .then((response) => {
        updateBeerInfo(response.data);
        updateEventType("updateBeerInfo");
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const handlePageClick = (event) => {
    var currentPage = event.selected + 1;
    if(eventType == "updateBeforeBeerInfo"){
      getBeforeBrewed(currentPage)
    }
    else if(eventType == "updateAfterBeerInfo"){
      getAfterBrewed(currentPage);
    }
    else{
      loadBeerDetails(currentPage);
    }
  };


  const getBeforeBrewed = (selectedPage) => {
    updateEventType("updateBeforeBeerInfo");
    const url = "https://api.punkapi.com/v2/beers?page=" + selectedPage + "&per_page=10&brewed_before=10-2011";
    axios.get(url)
      .then((response) => {
        updateBeerInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const getAfterBrewed = (selectedPage) => {
    updateEventType("updateAfterBeerInfo");

    const url = "https://api.punkapi.com/v2/beers?page=" + selectedPage + "&per_page=10&brewed_after=10-2011";
    axios.get(url)
      .then((response) => {
        updateBeerInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      })

  }

  var details = beerInfo.map((value, index) => {
    return (
      <tr key={index}>
        <td key={index} class="text-center">{value.id}</td>
        <td class="text-center ">{value.name}</td>
        <td class="text-center" ><img src={value.image_url} alt="" style={{ height: "15px", width: "20px" }} /></td>
        <td class="text-center">{value.tagline}</td>
        <td class="text-center">{value.first_brewed}</td>
        <td class="text-center" > <span class="d-inline-block text-truncate" style={{ textOverflow: "ellipsis", width: "400px", overflow: 'hidden', align: "center" }}> {value.description}</span></td>
        <td class="text-center">{value.attenuation_level}</td>
      </tr >
    )
  })

  return (
    <div>
      <div>
        <h4 class="text-center">Beer Info</h4>
      </div>
      <div>
        <nav class="navbar bg-body-tertiary">
          <div class="container-fluid">
            <form style={{ paddingLeft: "600px" }}>
              <label style={{ paddingRight: "30px" }}> Select Brewed Before or Brewed After : 10-2011</label>
              <input type="radio" class="btn btn-outline-success" id="before" name="dateBrewed" value="before" onClick={() => getBeforeBrewed(1)} />
              <label for="before" style={{ paddingRight: "30px" }} >Brewed Before</label>
              <input type="radio" class="btn btn-outline-success" id="after" name="dateBrewed" value="after" onClick={() => getAfterBrewed(1)} />
              <label for="after" style={{ paddingRight: "30px" }}>Brewed After</label>
              <button type="reset" onClick={() => loadBeerDetails(1)}>Reset</button>
            </form>
          </div>
        </nav>
        <table class="table caption-top">
          <thead>
            <tr>
              <th class="text-center">ID</th>
              <th class="text-center">Name</th>
              <th class="text-center">Image</th>
              <th class="text-center">Tagline</th>
              <th class="text-center">First Brewed</th>
              <th class="text-center">Description</th>
              <th class="text-center">Attenuation Level</th>
            </tr>
          </thead>
          <tbody>
            {details}
          </tbody>
        </table>
      </div>

      <div style={{ paddingLeft: "950px" }}>
        <ReactPaginate

          previousLabel="Previous"
          nextLabel="Next"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          pageCount={10}
          onPageChange={handlePageClick}
          containerClassName="pagination"
          activeClassName="active"
        />
      </div>

    </div >
  );
};

export default TechRoundTask;
