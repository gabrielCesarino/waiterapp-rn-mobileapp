import { FlatList } from "react-native";
import { products } from "../../mocks/products";
import { PlusCircle } from "../Icons/PlusCircle";
import { Text } from "../Text";

import { Product, ProductImage, ProductDetails, Separator, AddToCartButton } from './styles'

export function Menu() {

	const formatCurrency = new Intl.NumberFormat(
		'pt-br',
		{ style: 'currency', currency: 'BRL'}
	)

	return (
		<FlatList
			data={products}
			style={{ marginTop: 32}}
			contentContainerStyle= {{ paddingHorizontal: 24}}
			ItemSeparatorComponent={Separator}
			keyExtractor={(product) => product._id}
			renderItem={({ item: product}) => (
				<Product>
					<ProductImage
						source={{
							uri: `http://192.168.1.100:3002/uploads/${product.imagePath}`
						}}
					/>
					<ProductDetails>
						<Text weight="600">{product.name}</Text>
						<Text color="#665" size={14} style={{marginVertical: 8}}>
							{product.description}
						</Text>
						<Text weight="600" size={14}>{formatCurrency.format(product.price)}</Text>
					</ProductDetails>

					<AddToCartButton>
						<PlusCircle />
					</AddToCartButton>
				</Product>
			)}
		/>
	)
}
