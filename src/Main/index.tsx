import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { Button } from '../components/Button';
import { Container, CategoriesContainer, MenuContainer, Footer, FooterContainer } from './styles';
import { TableModal } from '../components/TableModal';
import { useState } from 'react';

export function Main() {
	const [isTableModalVisible, setIsTableModalVisible] = useState(false);


	return (
		<>
			<Container>
				<Header />
				<CategoriesContainer>
					<Categories />
				</CategoriesContainer>

				<MenuContainer>
					<Menu />
				</MenuContainer>

			</Container>
			<Footer>
				<FooterContainer>
					<Button onPress={() => setIsTableModalVisible(true)}>Novo pedido</Button>
				</FooterContainer>
			</Footer>

			<TableModal onClose={() => setIsTableModalVisible(false)} visible={isTableModalVisible}/>
		</>


	)
}
