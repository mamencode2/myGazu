import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View , Image} from 'react-native';

import { Card , Checkbox} from 'react-native-paper';



export default function FuelItem({item, chHandler, i}){

return(
<Pressable style={{margin:10}} >
<Card style={{padding:10}}

      onPress={(value) => chHandler(item, i)}
>


<Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>
{item.fuel}
</Text>
<View style={{flexDirection: 'row', justifyContent: 'center',
    alignItems: 'center'}}>
         <Checkbox
            status={item.checked ? 'checked' : 'unchecked'}
            
            
            />
<Image source={item.image} style={{width:100, height:50, resizeMode: 'contain'}}/>

</View>
</Card>
</Pressable>
)

}