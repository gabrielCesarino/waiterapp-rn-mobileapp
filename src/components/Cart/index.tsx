import { FlatList, TouchableOpacity } from "react-native";
import { CartItem } from "../../types/CartItem";
import { MinusCircle } from "../Icons/MinusCircle";
import { PlusCircle } from "../Icons/PlusCircle";
import { Text } from "../Text";
import { Item, ProductContainer, Actions, Image, QuantityContainer, ProductDetails} from './styles'

interface CartProps {
	cartItems: CartItem[];
}

export function Cart({cartItems}: CartProps) {
	const formatCurrency = new Intl.NumberFormat(
		'pt-br',
		{ style: 'currency', currency: 'BRL' }
	)

	return (
		<FlatList
			data={cartItems}
			keyExtractor= {cartItem => cartItem.product._id}
			showsVerticalScrollIndicator={false}
			renderItem={({item: cartItem}) => (
				<Item>
					<ProductContainer>
						<Image
							source={{
								uri: `http://192.168.1.100:3002/uploads/${cartItem.product.imagePath}`
							}}
						/>
						<QuantityContainer>
							<Text size={14} color="#665">{cartItem.quantity}x</Text>
						</QuantityContainer>
						<ProductDetails>
							<Text weight="600" size={14}>{cartItem.product.name}</Text>
							<Text size={14} color='#665' style={{marginTop: 4}}>
								{formatCurrency.format(cartItem.product.price)}
							</Text>
						</ProductDetails>
					</ProductContainer>
					<Actions>
							<TouchableOpacity style={{ marginRight: 20}}>
								<PlusCircle />
							</TouchableOpacity>
							<TouchableOpacity>
								<MinusCircle />
							</TouchableOpacity>
					</Actions>
				</Item>
			)}
		/>
	);
}
