import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Pressable, Platform, TextInput, Switch, TouchableHighlight } from 'react-native';
import {Octicons} from '@expo/vector-icons'; //iconit käyttöön!
import styles from './styles/styles';

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
const DeleteProduct = (props: { passProductId: any, closeModal: any, refreshAfterEdit: any }) => {
    let ProductId = props.passProductId; //Propsi, jonka kutsuva ohjelma asettaa tälle komponentille
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

    useEffect(() => {
        GetProductData();
    }, [props.passProductId]); //ainakun productId -muuttuu päivitetään useEffect...

    //Tuotetietojen haku id:llä tietokannasta
    function GetProductData() {
        let uri = 'https://webapivscareeria.azurewebsites.net/nw/products/' + ProductId;
        fetch(uri)
            .then(response => response.json())
            .then((json: INWProductsResponse) => {
                setProductName(json.productName);
                setSupplierId(json.supplierId.toString());
                setCategoryId(json.categoryId.toString());
                setQuantityPerUnit(json.quantityPerUnit);
                setUnitPrice(json.unitPrice.toString());
                setUnitsInStock(json.unitsInStock.toString());
                setUnitsOnOrder(json.unitsOnOrder.toString());
                setReorderLevel(json.reorderLevel.toString());
                setDiscontinued(json.discontinued);
                setImageLink(json.imageLink);
        })
    }

    //Tuotteen poisto
    async function deleteProductOnPress() {
        await DeleteToDB();
        props.refreshAfterEdit(true);
        closeModal();
    }

    //Funktio jossa lähetetään uudet syötetyt tiedot tietokantaan
    function DeleteToDB() {
        const apiUrl = "https://webapivscareeria.azurewebsites.net/nw/products/" + ProductId;
        fetch(apiUrl, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8"
            },
            body: null
            })
                .then((response) => response.json())
                .then((json) => {
                    const success = json;
                    if (success) {
                        alert('Tuote id:' + ProductId + ' poistettu.');
                    }
                    else {
                        alert('Tuotteen ' + ProductId + ' poistossa tapahtui virhe.');
                    }
                });
    }

    //Sulje details -button
    function closeModal() {
        props.closeModal(true);
    }

    //Tulostetaan sivu
    return (
        <View style={styles.inputContainer}>
            <ScrollView>
                <View key={ProductId}>
                    <View style={styles.topSection}>
                        <Pressable onPress={() => deleteProductOnPress()}>
                            <View><Octicons name="trashcan" size={24} color="red" /></View> 
                        </Pressable>
                    
                        <Pressable onPress={() => closeModal()}>
                            <View><Octicons name="x" size={24} color="black" /></View>
                        </Pressable>
                    </View>

                    <Text style={styles.inputHeaderTitle}>Haluatko poistaa tämän tuotteen:</Text>
                    <Text style={styles.inputTitle}>ID:</Text>
                    <TextInput style={styles.inputTitle}
                        underlineColorAndroid="transparent"
                        defaultValue={ProductId.toString()}
                        autoCapitalize="none"
                        editable={false}
                    />

                    <Text style={styles.inputTitle}>Nimi:</Text>
                    <TextInput style={styles.inactiveField}
                        underlineColorAndroid="transparent"
                        value={ProductName.toString()}
                        autoCapitalize="none"
                        editable={false}
                    />
                     { ProductName ? null : ( <Text style={styles.validationError}>Anna tuotteen nimi!</Text> )}  
        
                    <Text style={styles.inputTitle}>Hinta:</Text>
                    <TextInput style={styles.inactiveField}
                        underlineColorAndroid="transparent"
                        value={(UnitPrice.toString() == null ? '0' : UnitPrice.toString())}
                        autoCapitalize="none"
                        keyboardType='numeric'
                        editable={false}
                    />

                    <Text style={styles.inputTitle}>Varastossa:</Text>
                    <TextInput style={styles.inactiveField}
                        underlineColorAndroid="transparent"
                        value={UnitsInStock.toString()}
                        autoCapitalize="none"
                        keyboardType='numeric'
                        editable={false}
                    />

                    <Text style={styles.inputTitle}>Hälytysraja:</Text>
                    <TextInput style={styles.inactiveField}
                        underlineColorAndroid="transparent"
                        value={ReorderLevel.toString()}
                        autoCapitalize="none"
                        keyboardType='numeric'
                        editable={false}
                    />

                    <Text style={styles.inputTitle}>Tilauksessa:</Text>
                    <TextInput style={styles.inactiveField}
                        underlineColorAndroid="transparent"
                        value={UnitsOnOrder.toString()}
                        autoCapitalize="none"
                        keyboardType='numeric'
                        editable={false}
                    />

                    <Text style={styles.inputTitle}>Kategoria:</Text>
                    <TextInput style={styles.inactiveField}
                        underlineColorAndroid="transparent"
                        value={CategoryId.toString()}
                        autoCapitalize="none"
                        keyboardType='numeric'
                        editable={false}
                    />

                    <Text style={styles.inputTitle}>Pakkauksen koko:</Text>
                    <TextInput style={styles.inactiveField}
                        underlineColorAndroid="transparent"
                        value={QuantityPerUnit.toString()}
                        autoCapitalize="none"
                        keyboardType='numeric'
                        editable={false}
                    />

                    <Text style={styles.inputTitle}>Tavarantoimittaja:</Text>
                    <TextInput style={styles.inactiveField}
                        underlineColorAndroid="transparent"
                        value={SupplierId.toString()}
                        autoCapitalize="none"
                        keyboardType='numeric'
                        editable={false}
                    />

                    <Text style={styles.inputTitle}>Tuote poistunut:</Text>
                    <View style={{ flexDirection: 'row', marginLeft: 15, }}>
                        <Text style={{ marginRight: 4, }}>Ei</Text>
                        <Switch
                            value={Discontinued}
                        />
                        <Text style={{ marginLeft: 4, }}>Kyllä</Text>
                    </View>

                    <Text style={styles.inputTitle}>Kuvan linkki:</Text>
                    <TextInput style={styles.inactiveField}
                        underlineColorAndroid="transparent"
                        value={(ImageLink == null ? '' : ImageLink.toString())}
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        editable={false}
                    />

                </View>
            </ScrollView>
        </View>
    );
}

export default DeleteProduct;