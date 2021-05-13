import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Pressable, Platform, TextInput, Switch, TouchableHighlight } from 'react-native';
import {Octicons} from '@expo/vector-icons'; //iconit käyttöön!
import styles from './styles/styles';

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

//picker 1
interface INWCategories {
    categoryId : number;
    categoryName: string;
    description: string;
    picture: string;
}

//picker 2
interface INWSuppliers {
    supplierId: number;
    companyName: string;
    contactName: string;
    contactTitle: string;
    address: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
    phone: string;
    fax: string;
    homePage: string;
}

const CreateProduct = (props: { closeModal: any, refreshAfterEdit: any }) => {
    const [ProductName, setProductName] = useState('...');
    const [SupplierId, setSupplierId] = useState('0');
    const [CategoryId, setCategoryId] = useState('0');
    const [QuantityPerUnit, setQuantityPerUnit] = useState('0');
    const [UnitPrice, setUnitPrice] = useState('0');
    const [UnitsInStock, setUnitsInStock] = useState('0');
    const [UnitsOnOrder, setUnitsOnOrder] = useState('0');
    const [ReorderLevel, setReorderLevel] = useState('0');
    const [Discontinued, setDiscontinued] = useState(false);
    const [ImageLink, setImageLink] = useState('...');
    //HOX Validation - jos ei mene läpi, ei tallennapainike ole aktiivinen
    let validaatio = false;

    //PICKER 
    const [categories, setCategories] = useState<any>([]);
    const [selectedCat, setSelectedCat] = useState<any>("All");

    const [suppliers, setSuppliers] = useState<any>([]);
    const [selectedSup, setSelectedSup] = useState<any>("All");

    //picker 1
    const categoriesList = categories.map((cat: INWCategories, index:any) => {
        return (
            <Picker.Item label={cat.categoryId + ' - ' + cat.categoryName} value={cat.categoryId} key={index} />
        )
    });

    //picker 2
    const suppliersList = suppliers.map((sup: INWSuppliers, index:any) => {
        return (
            <Picker.Item label={sup.companyName} value={sup.supplierId} key={index} />
        )
    });

    //pickerit
    useEffect(() => {
        GetCategories();
        GetSuppliers();
    });

    function GetCategories() {
        let uri = 'https://webapivscareeria.azurewebsites.net/nw/products/getcat';
        fetch(uri)
            .then(response => response.json())
            .then((json: INWCategories) => {
                setCategories(json);
            })
    }

        function GetSuppliers() {
        let uri = 'https://webapivscareeria.azurewebsites.net/nw/products/getsupplier';
        fetch(uri)
            .then(response => response.json())
            .then((json: INWSuppliers) => {
                setSuppliers(json);
            })
    }

 
    //Tuotteen lisäys
    async function createProductOnPress(ProductName: string) {
        if (Platform.OS === 'web') {
            if (validaatio == false) {
                alert('Tuotetta ' + ProductName + ' ei voi tallentaa tietojen puutteellisuuden vuoksi!');
            } else {
                await PostToDB();
                console.log('Tuote ' + ProductName + ' lisätty onnistuneesti');
                closeModalAndRefresh();
            }
        }
        else {
            if (validaatio == false) {
                alert('Tuotetta ' + ProductName + ' ei voi tallentaa tietojen puutteellisuuden vuoksi!');
            } else {
                await PostToDB();
                alert('Tuote ' + ProductName + ' lisätty onnistuneesti!');
                closeModalAndRefresh();
            }

        }
    }

    //Funktio jossa lähetetään uudet syötetyt tiedot tietokantaan
    function PostToDB() {
        const product =
        {
            ProductName: ProductName,
            SupplierID: Number(SupplierId),
            CategoryID: Number(CategoryId),
            QuantityPerUnit: QuantityPerUnit,
            UnitPrice: parseFloat(Number(UnitPrice).toFixed(2)),
            UnitsInStock: Number(UnitsInStock),
            UnitsOnOrder: Number(UnitsOnOrder),
            ReorderLevel: Number(ReorderLevel),
            Discontinued: Boolean(Discontinued),
            ImageLink: ImageLink,
        };

        //konvertoidaan muuttuja JSON-string -tyyppiseksi
        const prodCreateJson = JSON.stringify(product);
        //console.log(prodCreateJson);

        const apiUrl = "https://webapivscareeria.azurewebsites.net/nw/products/";
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8"
            },
            body: prodCreateJson //lähetetään html-body:ssä konvertoitu data...
            })
                .then((response) => response.json())
                .then((json) => {
                    const success = json;
                    if (success) {
                        console.log(success);
                    }
                    else {
                        console.log('Error updating' + ProductName)
                    }
                });
    }

    //Sulje details -button
    function closeModal() {
        props.closeModal(true);
    }

    //Suljetaan ikkuna ja päivitetään lista
    function closeModalAndRefresh() {
        props.closeModal();
        props.refreshAfterEdit();
    }

    //HOX picker 1 fetch
    function fetchCategory(value: any) {
        setSelectedCat(value);
    }

    //HOX picker 2 fetch
    function fetchSupplier(value: any) {
        setSelectedSup(value);
    }

    //2-vaihe Validointi
    function priceValidation(price: string, field: string) {
        //alert(price) ;
        // alert(typeof(price));
        if ((price == '') || (price === null ) || ( price.indexOf(',') > 0 )) {
            validaatio = false;
            return false;
        }
        else {
            validaatio = true;
            return true;
        }
    }

    //Tulostetaan sivu
    return (
        <View style={styles.inputContainer}>
            <ScrollView>
                <View>
                    <View style={styles.topSection}>
                        <Pressable onPress={() => createProductOnPress(ProductName)}>
                            <View><Octicons name="check" size={24} color="green" /></View> 
                        </Pressable>
                    
                        <Pressable onPress={() => closeModal()}>
                            <View><Octicons name="x" size={24} color="black" /></View>
                        </Pressable>
                    </View>

                    <Text style={styles.inputHeaderTitle}>Tuotteen lisäys:</Text>

                    <Text style={styles.inputTitle}>Nimi:</Text>
                    <TextInput style={styles.editInput}
                        underlineColorAndroid="transparent"
                        onChangeText={val => setProductName(val)}
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        selectTextOnFocus={true}
                    />
                     { ProductName ? null : ( <Text style={styles.validationError}>Anna tuotteen nimi!</Text> )}  
        
                    <Text style={styles.inputTitle}>Hinta:</Text>
                    <TextInput style={styles.editInput}
                        underlineColorAndroid="transparent"
                        onChangeText={val => setUnitPrice(val)}
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        keyboardType='numeric'
                        selectTextOnFocus={true}
                    />
                    { priceValidation(UnitPrice, 'UnitPrice') == true ? null : ( <Text style={styles.validationError}>Anna hinta muodossa n.zz!</Text> )}

                    <Text style={styles.inputTitle}>Varastossa:</Text>
                    <TextInput style={styles.editInput}
                        underlineColorAndroid="transparent"
                        onChangeText={val => setUnitsInStock((val))}
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        keyboardType='numeric'
                        selectTextOnFocus={true}
                    />

                    <Text style={styles.inputTitle}>Hälytysraja:</Text>
                    <TextInput style={styles.editInput}
                        underlineColorAndroid="transparent"
                        onChangeText={val => setReorderLevel(val)}
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        keyboardType='numeric'
                        selectTextOnFocus={true}
                    />

                    <Text style={styles.inputTitle}>Tilauksessa:</Text>
                    <TextInput style={styles.editInput}
                        underlineColorAndroid="transparent"
                        onChangeText={val => setUnitsOnOrder(val)}
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        keyboardType='numeric'
                        selectTextOnFocus={true}
                    />

                    <Text style={styles.inputTitle}>Kategoria:</Text>
                    {/* <TextInput style={styles.editInput}
                        underlineColorAndroid="transparent"
                        onChangeText={val => setCategoryId(val)}
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        keyboardType='numeric'
                        selectTextOnFocus={true}
                    /> */}
                    {/* picker 1 */}
                    <Picker
                        prompt="Valitse tuoteryhmä"
                        mode="dropdown"
                        selectedValue={CategoryId}
                        style={{ left:10, height: 50, width: 260, padding: 10 }}
                        onValueChange={val => setCategoryId(val)}
                    >
                        {categoriesList}
                    </Picker>

                    <Text style={styles.inputTitle}>Pakkauksen koko:</Text>
                    <TextInput style={styles.editInput}
                        underlineColorAndroid="transparent"
                        onChangeText={val => setQuantityPerUnit(val)}
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        keyboardType='numeric'
                        selectTextOnFocus={true}
                    />

                    <Text style={styles.inputTitle}>Tavarantoimittaja:</Text>
                    {/* <TextInput style={styles.editInput}
                        underlineColorAndroid="transparent"
                        onChangeText={val => setSupplierId(val)}
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        keyboardType='numeric'
                        selectTextOnFocus={true}
                    /> */}
                    {/* picker 2 */}
                    <Picker
                        prompt="Valitse toimittaja"
                        mode="dropdown"
                        selectedValue={SupplierId}
                        style={{ height: 50, width: 260 }}
                        onValueChange={val => setSupplierId(val)}
                    >
                        {suppliersList}
                    </Picker>


                    <Text style={styles.inputTitle}>Tuote poistunut:</Text>
                    <View style={{ flexDirection: 'row', marginLeft: 15, }}>
                        <Text style={{ marginRight: 4, }}>Ei</Text>
                        <Switch
                            value={Discontinued}
                            onValueChange={val => setDiscontinued(val)}
                        />
                        <Text style={{ marginLeft: 4, }}>Kyllä</Text>
                    </View>

                    <Text style={styles.inputTitle}>Kuvan linkki:</Text>
                    <TextInput style={styles.editInput}
                        underlineColorAndroid="transparent"
                        onChangeText={val => setImageLink(val)}
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        selectTextOnFocus={true}
                    />
                    <Pressable  
                        style={styles.submitButton}
                        onPress={
                            () => createProductOnPress(ProductName)
                        }
                    >
                        <Text style={styles.submitButtonText}>{' Lisää tuote '}</Text>
                    </Pressable>

                </View>
            </ScrollView>
        </View>
    );
}

export default CreateProduct;