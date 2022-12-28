import { FlatList, TouchableOpacity } from 'react-native';
import { useState } from 'react';

import { OrderConfirmedModal } from '../../OrderConfirmedModal';
import { CartItem } from '../../types/CartItem';
import { Product } from '../../types/Product';
import { Button } from '../Button';
import { MinusCircle } from '../Icons/MinusCircle';
import { PlusCircle } from '../Icons/PlusCircle';
import { Text } from '../Text';
import {
	Item,
	ProductContainer,
	Actions,
	Image,
	QuantityContainer,
	ProductDetails,
	Summary,
	TotalContainer
} from './styles';

interface CartProps {
	cartItems: CartItem[];
	onAdd: (product: Product) => void;
	onDecrement: (product: Product) => void;
	onConfirmOrder: () => void;
}

export function Cart({ cartItems, onAdd, onDecrement, onConfirmOrder }: CartProps) {
	const [isLoading] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const formatCurrency = new Intl.NumberFormat(
		'pt-br',
		{ style: 'currency', currency: 'BRL' }
	);

	const total = cartItems.reduce((acc, cartItem) => {
		return acc + cartItem.quantity * cartItem.product.price;
	}, 0);

	function handleConfirmOrder() {
		setIsModalVisible(true);
	}

	function handleOk() {
		onConfirmOrder();
		setIsModalVisible(false);
	}

	return (
		<>
			<OrderConfirmedModal
				visible={isModalVisible}
				onOk={handleOk}
			/>
			{cartItems.length > 0 && (
				<FlatList
					data={cartItems}
					keyExtractor={cartItem => cartItem.product._id}
					showsVerticalScrollIndicator={false}
					style={{ marginBottom: 20, maxHeight: 150}}
					renderItem={({ item: cartItem }) => (
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
									<Text size={14} color='#665' style={{ marginTop: 4 }}>
										{formatCurrency.format(cartItem.product.price)}
									</Text>
								</ProductDetails>
							</ProductContainer>
							<Actions>
								<TouchableOpacity onPress={() => onAdd(cartItem.product)}style={{ marginRight: 20 }}>
									<PlusCircle />
								</TouchableOpacity>
								<TouchableOpacity onPress={() => onDecrement(cartItem.product)}>
									<MinusCircle />
								</TouchableOpacity>
							</Actions>
						</Item>
					)}
				/>
			)}

			<Summary>
				<TotalContainer>
					{cartItems.length > 0 ? (
						<>
							<Text color='#665'>Total</Text>
							<Text size={20} weight="600">{formatCurrency.format(total)}</Text>
						</>
					) : (
						<Text color='#665'>Seu carrinho está vazio</Text>
					)}
				</TotalContainer>

				<Button
					disabled={cartItems.length === 0}
					onPress={handleConfirmOrder}
					loading={isLoading}
				>
					Confirmar pedido
				</Button>
			</Summary>
		</>
	);
}
