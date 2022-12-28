import { FlatList, Modal } from 'react-native';
import { Product } from '../../types/Product';
import { Button } from '../Button';
import { Close } from '../Icons/Close';
import { Text } from '../Text';
import { CloseButton, Header, Image, ModalBody, IngredientsContainer, Ingredient, Footer, FooterContainer, Price } from './styles';

interface ProductModalProps {
	visible: boolean;
	onClose: () => void;
	product: null | Product;
	onAddToCart: (product: Product) => void;
}


export function ProductModal({ visible, onClose, product,onAddToCart }: ProductModalProps) {

	const formatCurrency = new Intl.NumberFormat(
		'pt-br',
		{ style: 'currency', currency: 'BRL' }
	);

	if (!product) {
		return null;
	}

	function handleAddToCart(){
		onAddToCart(product);
		onClose();
	}

	return (
		<Modal
			visible={visible}
			animationType="slide"
			presentationStyle='pageSheet'
			onRequestClose={onClose}
		>
			<Image
				source={{
					uri: `http://192.168.1.100:3002/uploads/${product.imagePath}`,
				}}
			>
				<CloseButton onPress={onClose}>
					<Close />
				</CloseButton>
			</Image>
			<ModalBody>
				<Header>
					<Text size={24} weight="600">{product.name}</Text>
					<Text color='#665' style={{ marginTop: 8 }}>{product.description}</Text>
				</Header>

				{product.ingredients.length > 0 && <IngredientsContainer>
					<Text weight='600' color='#665'>Ingredientes</Text>
					<FlatList
						data={product.ingredients}
						keyExtractor={ingredient => ingredient._id}
						showsVerticalScrollIndicator={false}
						style={{ marginTop: 16 }}
						renderItem={({ item: ingredient }) => (
							<Ingredient>
								<Text>{ingredient.icon}</Text>
								<Text size={14} color='#665' style={{ marginLeft: 20 }}>{ingredient.name}</Text>
							</Ingredient>
						)}
					/>
				</IngredientsContainer>}
			</ModalBody>
			<FooterContainer>
				<Footer>
					<Price>
						<Text color='#665'>Preço</Text>
						<Text size={20} weight='600'>{formatCurrency.format(product.price)}</Text>
					</Price>
					<Button onPress={handleAddToCart}>Adicionar ao pedido</Button>
				</Footer>
			</FooterContainer>
		</Modal>
	);
}
