import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
	EffectFade,
	Autoplay,
	Navigation,
	Pagination,
	Grid,
} from "swiper";
import "swiper/css/bundle";
import "../index.css";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

export default function Listing() {
	const params = useParams();
	const [listing, setListing] = useState(null);
	const [loading, setLoading] = useState(true);
	SwiperCore.use([Autoplay, Navigation, Pagination]);
	useEffect(() => {
		async function fetchListing() {
			const docRef = doc(db, "listings", params.listingId);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				setListing(docSnap.data());
				setLoading(false);
			}
		}
		fetchListing();
	}, [params.listingId]);

	if (loading) {
		return <Spinner />;
	}

	return (
		<main>
			<Swiper
				slidesPerView={2}
				grid={{
					rows: 1,
				}}
				spaceBetween={30}
				pagination={{
					clickable: true,
				}}
				modules={[Grid, Pagination]}
				className="w-100 h-100 ml-auto mr-auto "
				breakpoints={{
					// Ekran kengligi 768 pikseldan katta bo'lganda (planshet va kompyuter)
					768: {
						slidesPerView: 2,
					},
					// Ekran kengligi 480 pikseldan katta bo'lganda (telefon)
					480: {
						slidesPerView: 1,
					},
				}}
				
			>
				{listing.imgUrls.map((url, index) => (
					<SwiperSlide key={index}>
						<div
							className="relative w-full overflow-hidden h-[400px]  "
							style={{
								background: `url(${listing.imgUrls[index]}) center no-repeat `, 
								backgroundSize: "cover",
							}}
						></div>
					</SwiperSlide>
				))}
			</Swiper>
		</main>
	);
}
