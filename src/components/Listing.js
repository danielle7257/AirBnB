import './Listing.css';

function Listing(props) {

  return (
    <div className="outerContainer">
        <div className="innerContainer">
            <p><a href={props.link}>{props.name}</a></p>
            <img className="listingImage" src={props.imgUrl} alt="listingPhoto" />
            <p>{props.sPrice} per night - {props.location}</p>
        </div>
        <div>
            <p><a href={props.hostLink}>Host</a> - {props.host}</p>
            <img className="listingImage" src={props.hostImgUrl} alt="hostPhoto" />
            <p>{props.rating}/5 stars</p>
        </div>
    </div>
  );
}

export default Listing;
