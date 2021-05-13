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
//HOX FILTER
interface INWCategories {
    categoryId: number;
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

const EditProduct = (props: { passProductId: any, closeModal: any, refreshAfterEdit: any }) => {
    let ProductId = props.passProductId; //Propsi, jonka kutsuva ohjelma asettaa tälle komponentille
    const [ProductName, setProductName] = useState('...');
    const [SupplierId, setSupplierId] = useState('0');
    const [CategoryId, setCategoryId] = useState(0);  //picker tieotyyppi number
    const [CategoryName, setCategoryName] = useState('');
    const [QuantityPerUnit, setQuantityPerUnit] = useState('0');
    const [UnitPrice, setUnitPrice] = useState('0');
    const [UnitsInStock, setUnitsInStock] = useState('0');
    const [UnitsOnOrder, setUnitsOnOrder] = useState('0');
    const [ReorderLevel, setReorderLevel] = useState('0');
    const [Discontinued, setDiscontinued] = useState(false);
    const [ImageLink, setImageLink] = useState('');
    //HOX Validation - jos ei mene läpi, ei tallennapainike ole aktiivinen
    let validaatio = false;

    const [selectedCat, setSelectedCat] = useState<any>("All");
    //HOX FILTER
    const [categories, setCategories] = useState<any>([]);

    const [suppliers, setSuppliers] = useState<any>([]);
    const [selectedSup, setSelectedSup] = useState<any>("All");

    //HOX - Picker list for dropdown
    const categoriesList = categories.map((cat: INWCategories, index: any) => {
        return (
            <Picker.Item label={cat.categoryId + ' - ' +cat.categoryName} value={cat.categoryId} key={index} />
        )
    });

    //picker 2
    const suppliersList = suppliers.map((sup: INWSuppliers, index:any) => {
        return (
            <Picker.Item label={sup.companyName} value={sup.supplierId} key={index} />
        )
    });

    useEffect(() => {
        GetCategories();
        GetProductData();
        GetSuppliers();         // picker 2
    }, [props.passProductId]); //ainakun productId -muuttuu päivitetään useEffect...

    //Tuotetietojen haku id:llä tietokannasta
    function GetProductData() {
        let uri = 'https://webapivscareeria.azurewebsites.net/nw/products/' + ProductId;
        fetch(uri)
            .then(response => response.json())
            .then((json: INWProductsResponse) => {
                setProductName(json.productName);
                setSupplierId(json.supplierId.toString());
                setCategoryId(json.categoryId);             //HOX tietotyyppi number
                setQuantityPerUnit(json.quantityPerUnit);
                setUnitPrice(json.unitPrice.toString());
                setUnitsInStock(json.unitsInStock.toString());
                setUnitsOnOrder(json.unitsOnOrder.toString());
                setReorderLevel(json.reorderLevel.toString());
                setDiscontinued(json.discontinued);
                setImageLink(json.imageLink);
        })
    }

    //HOX dropdown
    function GetCategories() {
        let uri = 'https://webapivscareeria.azurewebsites.net/nw/products/getcat';
        fetch(uri)
            .then(response => response.json())
            .then((json: INWCategories) => {
                setCategories(json);
            })
    }

    // picker 2
    function GetSuppliers() {
        let uri = 'https://webapivscareeria.azurewebsites.net/nw/products/getsupplier';
        fetch(uri)
            .then(response => response.json())
            .then((json: INWSuppliers) => {
                setSuppliers(json);
            })
    }

    //Tuotteen muokkaus
    async function editProductOnPress(ProductName: string) {
        if (Platform.OS === 'web') {
            if (validateOnSubmit() == false) {
            } else {
                await PutToDB();
                console.log('Tuotetta ' + ProductName + ' muokattu onnistuneesti');
                props.refreshAfterEdit(true);
                closeModal();
            }
        }
        else {
            if (validateOnSubmit() == false) {
            } else {
                await PutToDB();
                alert('Tuotetta ' + ProductName + ' muokattu onnistuneesti!');
                props.refreshAfterEdit(true);
                closeModal();
            }

        }
    }

    //Funktio jossa lähetetään uudet syötetyt tiedot tietokantaan
    function PutToDB() {
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

        //convertoidaan muuttuja JSON-string -tyyppiseksi
        const prodeditJson = JSON.stringify(product);
        //console.log(prodeditJson);

        const apiUrl = "https://webapivscareeria.azurewebsites.net/nw/products/" + ProductId;
        fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json; charset=utf-8"
            },
            body: prodeditJson //lähetetään html-body:ssä konvertoitu data...
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

    // URL validaatio, käy myös tyhjä. Jos kirjoitusta, niin pitää olla oikean muotoista
    function validateUrl(val: any) {
        if (val === null) {
            return true;
        }
        else {
            var rgx = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=_%.]+(?:png|jpg|jpeg|gif|svg)+$/;
            if (val.match(rgx)) {
                return true;
            }
            if (val == '') {
                return true;
            }
            else {
                return false;
            }
        }
    }

    // Hinnan validaatio
    function validatePrice(val: any) {
        if (val === null) {
            return true;
        }
        else {
            var rgx = /^[0-9]*\.?[0-9]*$/;
            if (String(val).match(rgx) == null) {
                return false;
            }
            else {
                return true;
            }
        }
    }

    // Merkkijonon validaation (MAX 70 merkkiä)
    function validateString(val: any) {
        if (val === "") {
            return false;
        }
        else {
                var rgx = /^.{1,70}$/;
            if (val.match(rgx) == null) {
                    return false;
                }
                else {
                    return true;
                }
        }
    }

    // Numero -validaatio (ensimmäinen numero ei voi olla 0, jos on enemmän numeroita kuin 1)
    function validateNumeric(val: any) {
        if (val === null) {
            return true;
        }
        else {
            var rgx = /^[1-9][0-9]*$/;
            if (String(val).match(rgx)) {
                return true;
            }
            if (val == '0') {
                return true;
            }
            else {
                return false;
            }
        }
    }

    function validateOnSubmit() {
        if (!validateString(ProductName)) {
            alert("Tarkista tuotteen nimi!");
            return false;
        } else if (!validatePrice(UnitPrice)) {
            alert("Tarkista tuotteen hinta!");
            return false;
        } else if (!validateNumeric(UnitsInStock)) {
            alert("Tarkista tuotteen varastomäärä");
            return false;
        } else if (!validateNumeric(ReorderLevel)) {
            alert("Tarkista tuotteen hälytysraja!");
            return false;
        } else if (!validateNumeric(UnitsOnOrder)) {
            alert("Tarkista tuotteen tilauksessa oleva määrä!");
            return false;
        } else if (!validateString(QuantityPerUnit)) {
            alert("Tarkista tuotteen pakkauksen koko!");
            return false;
        } else if (!validateUrl(ImageLink)) {
            alert("Tarkista kuvalinkki!");
            return false;
        } else {
            return true;
        }
    }

    //Tulostetaan sivu
    return (
        <View style={styles.inputContainer}>
            <ScrollView>
                <View key={ProductId}>
                    <View style={styles.topSection}>
                        <Pressable onPress={() => editProductOnPress(ProductName)}>
                            <View><Octicons name="check" size={24} color="green" /></View> 
                        </Pressable>
                    
                        <Pressable onPress={() => closeModal()}>
                            <View><Octicons name="x" size={24} color="black" /></View>
                        </Pressable>
                    </View>

                    <Text style={styles.inputHeaderTitle}>Tuotteen muokkaus:</Text>
                    <Text style={styles.inputTitle}>ID:</Text>
                    <TextInput style={styles.inputTitle}
                        underlineColorAndroid="transparent"
                        defaultValue={ProductId.toString()}
                        autoCapitalize="none"
                        editable={false}
                    />

                    <Text style={styles.inputTitle}>Nimi:</Text>
                    <TextInput style={styles.editInput} 
                        underlineColorAndroid="transparent"
                        onChangeText={val => setProductName(val)}
                        value={ProductName.toString()}
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        selectTextOnFocus={true}
                        
                    />
                    {/* { ProductName ? null : ( <Text style={styles.validationError}>Anna tuotteen nimi!</Text> )}   */}
                    { validateString(ProductName) == true ? null : ( <Text style={styles.validationError}>Anna tuotteen nimi!</Text> )}
        
                    <Text style={styles.inputTitle}>Hinta:</Text>
                    <TextInput style={styles.editInput}
                        underlineColorAndroid="transparent"
                        onChangeText={val => setUnitPrice(val)}
                        value={(UnitPrice.toString() == null ? '0' : UnitPrice.toString())}
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        keyboardType='numeric'
                        selectTextOnFocus={true}
                    />
                    {/* { priceValidation(UnitPrice, 'UnitPrice') == true ? null : ( <Text style={styles.validationError}>Anna hinta muodossa n.zz!</Text> )} */}
                    { validatePrice(UnitPrice) == true ? null : ( <Text style={styles.validationError}>Anna hinta muodossa n.zz!</Text> )}

                    <Text style={styles.inputTitle}>Varastossa:</Text>
                    <TextInput style={styles.editInput}
                        underlineColorAndroid="transparent"
                        onChangeText={val => setUnitsInStock((val))}
                        value={UnitsInStock.toString()}
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        keyboardType='numeric'
                        selectTextOnFocus={true}
                    />
                    { validateNumeric(UnitsInStock) == true ? null : ( <Text style={styles.validationError}>Anna varastomääräksi numero</Text> )}

                    <Text style={styles.inputTitle}>Hälytysraja:</Text>
                    <TextInput style={styles.editInput}
                        underlineColorAndroid="transparent"
                        onChangeText={val => setReorderLevel(val)}
                        value={ReorderLevel.toString()}
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        keyboardType='numeric'
                        selectTextOnFocus={true}
                    />

                    <Text style={styles.inputTitle}>Tilauksessa:</Text>
                    <TextInput style={styles.editInput}
                        underlineColorAndroid="transparent"
                        onChangeText={val => setUnitsOnOrder(val)}
                        value={UnitsOnOrder.toString()}
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        keyboardType='numeric'
                        selectTextOnFocus={true}
                    />

                    <Text style={styles.inputTitle}>Kategoria:</Text>
                    {/* <TextInput style={styles.editInput}
                        underlineColorAndroid="transparent"
                        onChangeText={val => setCategoryId(val)}
                        value={CategoryId.toString()}
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        keyboardType='numeric'
                        selectTextOnFocus={true}
                    /> */}

                    {/* HOX -picker Lisää picker edit-kenttien lomaan */}
                    <Picker
                        prompt='Valitse tuoteryhmä'
                        mode="dropdown"
                        selectedValue={CategoryId}
                        style={{ left:10, height: 50, width: 220, padding: 10}}
                        onValueChange={val => {setCategoryId(val)}}         
                    >
                        {categoriesList}
                    </Picker>
                    {/* picker edit-kenttien lomaan */}

                    <Text style={styles.inputTitle}>Pakkauksen koko:</Text>
                    <TextInput style={styles.editInput}
                        underlineColorAndroid="transparent"
                        onChangeText={val => setQuantityPerUnit(val)}
                        value={QuantityPerUnit.toString()}
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        keyboardType='numeric'
                        selectTextOnFocus={true}
                    />

                    <Text style={styles.inputTitle}>Tavarantoimittaja:</Text>
                    {/* <TextInput style={styles.editInput}
                        underlineColorAndroid="transparent"
                        onChangeText={val => setSupplierId(val)}
                        value={SupplierId.toString()}
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
                        style={{left:10, height: 50, width: 260 }}
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
                        value={(ImageLink == null ? '' : ImageLink.toString())}
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        selectTextOnFocus={true}
                    />
                     { validateUrl(ImageLink) == true ? null : ( <Text style={styles.validationError}>Tarkista syöttämäsi URI</Text> )}

                </View>
            </ScrollView>
        </View>
    );
}

export default EditProduct;