// codigo chatgpt sobre solide

interface IProduct {
	id: number
	name: string
	price: number
}

interface IProductRepository {
	get(id: number): IProduct | undefined
	save(product: IProduct): void
}

class Product implements IProduct {
	id: number
	name: string
	price: number

	constructor(id: number, name: string, price: number) {
		this.id = id
		this.name = name
		this.price = price
	}
}

class ProductRepository implements IProductRepository {
	private products: IProduct[] = []

	get(id: number): IProduct | undefined {
		return this.products.find((p) => p.id === id)
	}

	save(product: IProduct): void {
		const index = this.products.findIndex((p) => p.id === product.id)

		if (index >= 0) {
			this.products[index] = product
		} else {
			this.products.push(product)
		}
	}
}

class ProductService {
	constructor(private repository: IProductRepository) {}

	getProduct(id: number): IProduct | undefined {
		return this.repository.get(id)
	}

	saveProduct(product: IProduct): void {
		this.repository.save(product)
	}
}
