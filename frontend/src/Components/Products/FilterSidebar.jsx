import { color } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const FilterSidebar = () => {
    // Placeholder for filter state and functions
    
    const [searchParams, setSearchParams] = useSearchParams();
    
    const [filters, setFilters] = useState({
        category: '',
        gender: '',
        color: '',
        size: [],
        material:[],
        brand: [],
        minPrice:0,
        maxPrice: 1000,
    });

    const [priceRange, setPriceRange] = useState([0,1000]);
    const categories =["Top Wear", "Bottom Wear"];
    const colors =[
        "Red",
        "Blue",
        "Green",
        "Black",
        "White",
        "Yellow",
        "Pink",
        "Navy",
        "Beige",
        "Gray",
    ];
    const sizes = ["S", "M", "L", "XL", "XXL"];
    const materials = ["Cotton", "Polyester", "Wool", "Silk", "Denim"];
    const genders=["Men","Women"];

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);
        setFilters({
            category: params.category || '',
            brand: params.brand ? params.brand.split(',') : [],
            color: params.color || '',
            size: params.size ? params.size.split(',') : [],
            material: params.material ? params.material.split(',') : [],
            genders:params.gender || '',
            minPrice: params.minPrice ? parseFloat(params.minPrice) : 0,
            maxPrice: params.maxPrice ? parseFloat(params.maxPrice) : 1000,

        });
  return (
    <div>FilterSidebar</div>
  )
}

export default FilterSidebar