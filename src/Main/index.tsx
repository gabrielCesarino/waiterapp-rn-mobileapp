import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { Button } from '../components/Button';
import { Container, CategoriesContainer, MenuContainer, Footer, FooterContainer } from './styles';
import { TableModal } from '../components/TableModal';
import { useState } from 'react';

export function Main() {
	const [isTableModalVisible, setIsTableModalVisible] = useState(false);
	const [selectedTable, setSelectedTable] = useState('');

	function handleSaveTable(table: string) {
		setSelectedTable(table);
	}

	function handleCancelOrder(){
		setSelectedTable('')
	}

	return (
		<>
			<Container>
				<Header selectedTable={selectedTable} onCancelOrder={handleCancelOrder}/>
				<CategoriesContainer>
					<Categories />
				</CategoriesContainer>

				<MenuContainer>
					<Menu />
				</MenuContainer>

			</Container>
			<Footer>
				<FooterContainer>
					{!selectedTable && (
						<Button onPress={() => setIsTableModalVisible(true)}>Novo pedido</Button>
					)}
				</FooterContainer>
			</Footer>

			<TableModal
				onClose={() => setIsTableModalVisible(false)}
				visible={isTableModalVisible}
				onSave={handleSaveTable}
			/>
		</>


	)
}
