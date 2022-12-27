import { FlatList } from "react-native";
import { useState } from 'react';

import { products } from "../../mocks/products";
import { PlusCircle } from "../Icons/PlusCircle";
import { ProductModal } from "../ProductModal";
import { Text } from "../Text";

import { ProductContainer, ProductImage, ProductDetails, Separator, AddToCartButton } from './styles'
import { Product } from "../../types/Product";

export function Menu() {

	const formatCurrency = new Intl.NumberFormat(
		'pt-br',
		{ style: 'currency', currency: 'BRL' }
	)

	const [isProductModalVisible, setIsProductModalVisible] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<null | Product>(null);

	function handleOpenProductModal(product: Product) {
		setIsProductModalVisible(true);
		setSelectedProduct(product);
	}

	return (
		<>
			<ProductModal
				visible={isProductModalVisible}
				onClose={() => setIsProductModalVisible(false)}
				product={selectedProduct}
			/>

			<FlatList
				data={products}
				style={{ marginTop: 32 }}
				contentContainerStyle={{ paddingHorizontal: 24 }}
				ItemSeparatorComponent={Separator}
				keyExtractor={(product) => product._id}
				renderItem={({ item: product }) => (
					<ProductContainer onPress={() => handleOpenProductModal(product)}>
						<ProductImage
							source={{
								uri: `http://192.168.1.100:3002/uploads/${product.imagePath}`
							}}
						/>
						<ProductDetails>
							<Text weight="600">{product.name}</Text>
							<Text color="#665" size={14} style={{ marginVertical: 8 }}>
								{product.description}
							</Text>
							<Text weight="600" size={14}>{formatCurrency.format(product.price)}</Text>
						</ProductDetails>

						<AddToCartButton>
							<PlusCircle />
						</AddToCartButton>
					</ProductContainer>
				)}
			/>
		</>
	)
}
