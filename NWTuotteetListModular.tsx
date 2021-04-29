import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Image, Pressable, Modal, TouchableHighlight, ActivityIndicator, TouchableOpacity } from 'react-native';
import { FontAwesome5, Octicons } from '@expo/vector-icons'; //iconit käyttöön!
import styles from './styles/styles';
import ProductDetails from './ProductDetails';
import EditProduct from './EditProduct';
import CreateProduct from './CreateProduct';
import DeleteProduct from './DeleteProduct';
import {Picker} from '@react-native-picker/picker'; //Lisätty dropdown https://reactnative.dev/docs/picker on deprecated, joten käytetään ohjeistuksen mukaista pickeriä

interface INWProductsResponse {
    //Typescript -interface käytetään productItems -muuttujassa json
    productId: number;
    productName: string;
    supplierId: number;
    categoryId: number;
    quantityPerUnit: string;
    unitPrice: number;
    unitsInStock: number;
    unitsOnOrder: number;
    reorderLevel: number;
    discontinued: boolean;
    imageLink: string;
    category: string;
    supplier: string;
    checked: any;
}

//HOX FILTER
interface INWCategories {
    //Typescript -interface
    categoryId: number;
    categoryName: string;
    description: string;
    picture: string;
}

export default function NWTuotteetListModular() {
    const [product, setProduct] = useState<Partial<INWProductsResponse>>({});
    const [productItems, setproductItems] = useState<any>([]);
    const [productItemsCount, setproductItemsCount] = useState(0);
    const [ProductId, setProductId] = useState(0);
    const [productDetailsModal, setProductDetailsModal] = useState(false);
    const [productEditModal, setProductEditModal] = useState(false);
    const [productCreateModal, setProductCreateModal] = useState(false);
    const [productDeleteModal, setProductDeleteModal] = useState(false);
    //HOX FILTER
    const [categories, setCategories] = useState<any>([]);
    const [selectedCat, setSelectedCat] = useState<any>("All");
    {/*Tuotelistan päivityksen muuttujat*/ }
    const [refreshProducts, setRefreshProducts] = useState(false);
    const [refreshIndicator, setRefreshIndicator] = useState(false);
    //Picker
    const [dropdownCategory, setDropdownCategory] = useState('All');

    //HOX FILTER
    const categoriesList = categories.map((cat: INWCategories, index: any) => {
        return (
            <Picker.Item label={cat.categoryName} value={cat.categoryId} key={index} />
        )
    });

    useEffect(() => {
        //HOX FILTER GetCategories();
        GetCategories();
        GetProducts();
    }, [refreshProducts]);

    function GetProducts() {
        let uri = 'https://webapivscareeria.azurewebsites.net/nw/products/';
        fetch(uri)
            .then(response => response.json())
            .then((json: INWProductsResponse[]) => {
                if (selectedCat === "All") { 
                    setproductItems(json); //Tuotteet kirjoitetaan productItems -array muuttujaan.
                    const fetchCount = Object.keys(json).length; //Lasketaan montako tuotenimikettä on yhteensä.
                    setproductItemsCount(fetchCount); //Kirjoitetaan tuotenimikkeiden määrä productItemsCount -muuttujaan.
                }
                else {
                    const filtered = json.filter(x => x.categoryId === parseInt(selectedCat)); //Dropdown -listan categoryid:n omaavat tuotteet haetaan inventoryItems -array muuttujaan.
                    setproductItems(filtered);
                    const fetchCount = Object.keys(filtered).length; //Lasketaan montako tuotenimikettä on yhteensä.
                    setproductItemsCount(fetchCount); //Kirjoitetaan tuotenimikkeiden määrä productItemsCount -muuttujaan.
                }

            })
        setRefreshIndicator(false);
    }

    //HOX FILTER
    function GetCategories() {
        let uri = 'https://webapivscareeria.azurewebsites.net/nw/products/getcat';
        fetch(uri)
            .then(response => response.json())
            .then((json: INWCategories) => {
                setCategories(json);
            })
        setRefreshIndicator(false);
    }

    function refreshJsonData() {
        setRefreshProducts(!refreshProducts);
        setRefreshIndicator(true);
    }

    //Tuotteen muokkaus
    function editProductFunc(item: INWProductsResponse) {
        setProduct(item);  //asettaa product -hooks-objektiin klikatun tuotteen koko recordin (objektin)
        setProductEditModal(true); //Näytetään edit -ikkuna
    }

    //Create - Tuotteen lisäys
    function createProductFunc() {
        setProductCreateModal(true); //Näytetään create -ikkuna
    }

    //Tuotteen poisto!
    function deleteProductFunc(item: INWProductsResponse) {
        setProduct(item);  //asettaa product -hooks-objektiin klikatun tuotteen koko recordin (objektin)
        setProductDeleteModal(true); //Näytetään edit -ikkuna
    }

     //Modaali-ikkunan sulkeminen
    function closeDetailsModal() {
        setProductDetailsModal(!productDetailsModal);
    }
    function closeEditModal() {
        setProductEditModal(!productEditModal);
    }
    //Create -ikkunan sulkeminen
    function closeCreateModal() {
        setProductCreateModal(!productCreateModal);
    }
    //Delete -ikkunan sulkeminen
    function closeDeleteModal() {
        setProductDeleteModal(!productDeleteModal);
    }

    //Haetaan dropdown filter
    //HOX FILTER
    function fetchFiltered(value: any) {
        setSelectedCat(value);
        setRefreshProducts(!refreshProducts);
    }


    return (
        <View style={[styles.mainWrapper]}>
            <View style={[styles.topSection]}>
                <View>
                    <FontAwesome5 name="boxes" size={25} color="#000" />
                </View>
                <Text style={{ fontSize: 18, color: '#000' }}>{'Tuotteita yhteensä: ' + productItemsCount}</Text>
                <Pressable onPress={() => refreshJsonData()} style={({ pressed }) => [{ backgroundColor: pressed ? 'lightgray' : 'white' }]}>
                    <View>
                        <Octicons name="sync" size={24} color="black" />
                    </View>
                </Pressable>
                <ActivityIndicator size="small" color="#0000ff" animating={refreshIndicator} />{/* ActivityIndicator aktivoituu refreshJsonData() -funktiossa ja se deaktivoidaan GetProducts() -funktiossa */}
                {/* //HOX Create HOX uusi plus-painike 4s päivä*/}
                <Pressable onPress={() => createProductFunc()}>
                    <View>
                        <Octicons name="plus" size={24} color="green" />
                    </View>
                </Pressable>  
            </View>
            <View style={[styles.pickerSection]}>   
                {/* Lisää picker ylämenuun */}
                <Picker
                    prompt='Valitse tuoteryhmä'
                    selectedValue={selectedCat}
                    style={{ height: 50, width: 250 }}
                    onValueChange={(value) => fetchFiltered(value)}
                >
                    <Picker.Item label="Hae kaikki tuoteryhmät" value="All" />
                    {categoriesList}
                </Picker>
                {/* picker ylämenuun */}
            </View>

            
            <ScrollView>
                {productItems.map((item: INWProductsResponse) => (

                    <Pressable 
                        key={item.productId} 
                        onPress={() => {
                            setProduct(item);
                            setProductDetailsModal(true);
                        }}
                        style={({ pressed }) => [{ backgroundColor: pressed ? 'rgba(49, 179, 192, 0.5)' : 'white' }]}
                    >
                        <View style={styles.productsContainer}>
                            {/*Mikäli item.imageLink on undefined -> näytetään default -kuva, muuten item.imageLink*/}
                            <Image source={item.imageLink ? { uri: item.imageLink } : { uri: 'https://www.tibs.org.tw/images/default.jpg' }} 
                                style={[styles.centerSection, { height: 60, width: 60, backgroundColor: '#eeeeee', margin: 6, }]} />
                            <View style={{ flexGrow: 1, flexShrink: 1, alignSelf: 'center' }}>
                                <Text style={{ fontSize: 15 }}>{item.productName}</Text>
                                <Text style={{ color: '#8f8f8f' }}>{item.categoryId ? 'Variation: ' + item.categoryId : ''}</Text>
                                <Text style={{ color: '#333333', marginBottom: 10 }}>{'\u00E1 ' + (item.unitPrice == null ? 'unitprice is missing ' : item.unitPrice.toFixed(2))  + '\u20AC'}</Text>
                            </View>
                            {/*Euro -merkki tulee '\u20AC' käyttämällä...*/}
                            {/*á -merkki tulee '\u00E1' käyttämällä...*/}
                            {/* HOX UUSIA PAINIKKEITA - edit  */}
                            <View style={{ padding:2, marginRight: 10, marginTop: 30}}>
                                <TouchableOpacity style={[{ width: 32, height: 32 }]} onPress={() => editProductFunc(item)}>
                                    <Octicons name="pencil" size={24} color="black" />
                                </TouchableOpacity>
                                {/* HOX Delete Product */}
                                <TouchableOpacity style={[{ width: 32, height: 32}]} onPress={() => deleteProductFunc(item)}>
                                    <Octicons name="trashcan" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Pressable>
                ))}
                {/* DetailsModal -komponentin kutsu */}
                { productDetailsModal ? (
                    <Modal
                        style={[styles.modalContainer]}
                        animationType="slide"
                        transparent={true}
                        visible={true}
                    >
                        <ProductDetails closeModal={closeDetailsModal} passProductId={ product.productId } />

                    </Modal>
                ) : null }

                {/* editProduct -komponentti */}
                { productEditModal ? (
                    <Modal style={[styles.modalContainer]}
                        animationType="fade"
                        transparent={true}
                        visible={true}
                    >
                        <EditProduct closeModal={closeEditModal} refreshAfterEdit={refreshJsonData} passProductId={product.productId} />
                    </Modal>
                ) : null}
                {/* //HOX Create CreateProduct -komponentti */}
                { productCreateModal ? (
                    <Modal style={[styles.modalContainer]}
                        animationType="fade"
                        transparent={true}
                        visible={true}
                    >
                        <CreateProduct closeModal={closeCreateModal} refreshAfterEdit={refreshJsonData} />
                    </Modal>
                ) : null} 

                {/* deleteProduct -komponentti */}
                { productDeleteModal ? (
                    <Modal style={[styles.modalContainer]}
                        animationType="slide"
                        transparent={true}
                        visible={true}
                    >
                        <DeleteProduct closeModal={closeDeleteModal} refreshAfterEdit={refreshJsonData} passProductId={product.productId} />
                    </Modal>
                ) : null}       
            </ScrollView>
        </View>
    );
}