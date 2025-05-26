import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import SearchItem from './SearchItem.js';
import './components-css/SearchList.css';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import e from 'cors';
import SkeletonUI from './SkeletonUI.js';
import { UserContext } from '../App.js';

export default function SearchList(props) {
    const { theme, toggleTheme } = useContext(UserContext)

    const [term, setTerm] = useState(props.term);
    axios.defaults.baseURL = 'http://localhost:3030';
    const [responseMessage, setResponseMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState(null);
    const [items, setItems] = useState([]);
    let sorter = props.sortBy
    const [sortBy, setSortBy] = useState(sorter);

    let brander = props.brand
    const [brand, setBrand] = useState(brander);
    // const [render, setRender] = useState(false);

    useEffect(() => {
        sendData();
    }, [term]);

    useEffect(() => {
        setSortBy(props.sortBy);
        callFunc();
    }, [props.sortBy, sortBy]);

    useEffect(() => {
        setBrand(props.brand);
        callBrand();
    }, [props.brand, brand, sortBy, props.sortBy]);

    let storedTerm = localStorage.getItem('searchTerm');
    const sendData = async () => {
        if (storedTerm) {
            if (term && storedTerm === term) {
                await sending();
            }
            else if (term && storedTerm !== term) {
                localStorage.setItem('searchTerm', term);
                storedTerm = term;
                await sending();
            }
            else if (!term) {
                storedTerm = localStorage.getItem('searchTerm');
                setTerm(storedTerm);
                await sending();
            }

        } else {
            localStorage.setItem('searchTerm', term);
            storedTerm = term;
            await sending();
        }
        console.log("item: " + storedTerm);
    }
    const sending = async () => {
        try {
            const response = await axios.post('/api/sendData', { term: storedTerm }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = responseMessage.data;
            setResponse(response.data);
            setResponseMessage(responseData);
            console.log("res: " + response.data);

            response.data.searchTerm = storedTerm;
            setItems(response.data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setLoading(false);

    }

    const sortItems = (items, sortBy) => {
        if (items && items.name && items.name.length > 0) {
            let itemsArray;
            if (brand) {
                itemsArray = items.name.map((name, index) => ({
                    name: name,
                    link: items.link[index],
                    image: items.image[index],
                    price: items.price[index],
                    stars: items.stars[index],
                    ratings: items.ratings[index]
                }));
            }
            else {
                itemsArray = items;
            }
            if (sortBy === 'nosort') {
                return itemsArray
            }
            else if (sortBy === 'name') {
                return itemsArray.slice().sort((a, b) => a.name.localeCompare(b.name));
            }
            else if (sortBy === 'name2') {
                return itemsArray.slice().sort((a, b) => {
                    const comparison = a.name.localeCompare(b.name);
                    return -comparison
                });
            } else if (sortBy === 'price') {
                return itemsArray.slice().sort((a, b) => {
                    // Ensure that price property exists and is not undefined
                    const priceA = a.price ? parseFloat(a.price.replace(/[,]/g, '')) : 0;
                    const priceB = b.price ? parseFloat(b.price.replace(/[,]/g, '')) : 0;
                    return priceA - priceB;
                });
            } else if (sortBy === 'price2') {
                return itemsArray.slice().sort((a, b) => {
                    // Ensure that price property exists and is not undefined
                    const priceA = a.price ? parseFloat(a.price.replace(/[,]/g, '')) : 0;
                    const priceB = b.price ? parseFloat(b.price.replace(/[,]/g, '')) : 0;
                    return priceB - priceA;
                });
            }
            else if (sortBy === 'rating') {
                return itemsArray.slice().sort((a, b) => {
                    console.log(a.name + "--->rat " + String(a.ratings).substring(0, 4))
                    // Ensure that price property exists and is not undefined
                    const ratingA = a.ratings ? parseFloat(a.ratings.substring(0, 4).replace(/[,]/g, '')) : 0;
                    const ratingB = b.ratings ? parseFloat(b.ratings.substring(0, 4).replace(/[,]/g, '')) : 0;
                    return ratingA - ratingB;
                });
            }
            else if (sortBy === 'rating2') {
                return itemsArray.slice().sort((a, b) => {
                    // Ensure that price property exists and is not undefined
                    const ratingA = a.ratings ? parseFloat(a.ratings.substring(0, 4).replace(/[,]/g, '')) : 0;
                    const ratingB = b.ratings ? parseFloat(b.ratings.substring(0, 4).replace(/[,]/g, '')) : 0;
                    return ratingA - ratingB;
                });
            }

        }

        return [];
    };

    const callFunc = () => {
        let sortThis = props.sortBy ? props.sortBy : "nosort";
        let sortedItems;
        sortedItems = sortItems(response, sortThis);
        console.log("sortedtitems   " + sortedItems)
        console.log(sortedItems)
        const itemsArray2 = sortedItems.map(item => ({
            name: item.name,
            link: item.link,
            image: item.image,
            price: item.price,
            stars: item.stars,
            ratings: item.ratings
        }));
        let newItems = filterBrand(itemsArray2);

        // if (newItems && newItems.length > 0) {
        //     console.log("newItems");
        //     console.log(newItems);
        //     sortedItems = sortItems(newItems, sortThis);
        // } else {
        //     console.log("response");
        //     sortedItems = sortItems(response, sortThis);
        // }
        if (newItems && newItems.length > 0 && brand) {
            return newItems
        }
        callBrand()
        return sortedItems;
    };

    const callBrand = () => {
        let filteredItems = response;
        if (props.brand && brand && brand.length > 0) {
            filteredItems = filterBrand(response);
        }
        return filteredItems;
    };


    const filterBrand = (items) => {
        if (items && items.name && items.name.length > 0) {
            console.log("newItems   " + items)
            console.log(items)
            const itemsArray = items.name.map((name, index) => ({
                name: name,
                link: items.link[index],
                image: items.image[index],
                price: items.price[index],
                stars: items.stars[index],
                ratings: items.ratings[index]
            }));
            console.log("itemsArray")

            console.log(itemsArray)
            if (items && items.name && items.name.length > 0 && props.brand && brand && brand.length > 0) {
                const filteredItems = itemsArray.filter((item) => {
                    // Check if any of the brands in the array matches the item name
                    for (let i = 0; i < brand.length; i++) {
                        if (item.name.toLowerCase().includes(brand[i].toLowerCase())) {
                            return true;
                        }
                    }
                    return false;
                });
                let filteredItemsData = []


                if (filteredItems) {

                    return filteredItems;

                }
                else {
                    return itemsArray
                }
            }
            else if (itemsArray) {
                return itemsArray
            }
        }
    }

    return (
        <div className='SearchList'>
            {
                loading ?
                    <div className="skeleton-holder">
                        <SkeletonUI count={16} />
                    </div> :
                    (
                        brand && props.brand && props.brand.length > 0 ? (
                            callBrand().length > 0 ? (
                                callBrand().map((item, index) => (
                                    <div className="itemWrapper" key={index}>

                                        <SearchItem
                                            name={item.name.replace(/[\/\\]/g, " ")}
                                            link={item.link}
                                            image={item.image}
                                            price={item.price}
                                            stars={item.stars}
                                            ratings={item.ratings}
                                        />
                                    </div>
                                ))
                            ) : (
                                <div className={theme==='light'? 'no-result' : 'no-result no-result-dark'}>
                                    <div className="no-result-img">
                                        <img src="./imgs/nosaves.png" alt="" />
                                    </div>
                                    <div className="no-items">No results!</div>
                                    <div className="no-items-text"><i class="fa-solid fa-filter"></i>&nbsp; Your filters produced no items to display. Try with another filter.</div>
                                </div>
                            )
                        ) : brand && props.brand && props.brand.length > 0 && sortBy ? (
                            callFunc().map((item, index) => (
                                <div className="itemWrapper" key={index}>
                                    <SearchItem
                                        name={item.name.replace(/[\/\\]/g, " ")}
                                        link={item.link}
                                        image={item.image}
                                        price={item.price}
                                        stars={item.stars}
                                        ratings={item.ratings}
                                    />
                                </div>
                            ))

                        ) : (
                            callFunc().map((item, index) => (
                                <div className="itemWrapper" key={index}>
                                    <SearchItem
                                        name={item.name.replace(/[\/\\]/g, " ")}
                                        link={item.link}
                                        image={item.image}
                                        price={item.price}
                                        stars={item.stars}
                                        ratings={item.ratings}
                                    />
                                </div>
                            ))

                        )
                    )

            }
        </div>
    )
}
