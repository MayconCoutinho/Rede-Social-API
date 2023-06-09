import { collection, doc, getDocs, setDoc, updateDoc } from "firebase/firestore"
import { IpostDB, Post } from "../../models/post"
import { FirebaseConfigChave } from "../firebase"

export class PostsDataBase {
	public toPostDBModel = (user: Post): IpostDB => {
		const postUser: IpostDB = {
			idUser: user.getIdUser(),
			name: user.getName(),
			imgPerfil: user.getImgPerfil(),
			rgb: user.getRGB(),
			img: user.getImg(),
			texto: user.getTexto(),
			idUserLike: user.getIdUserLike(),
			date: user.getDate(),
		}
		return postUser
	}

	public getAllPostsDataBase = async () => {
		try {
			const db = FirebaseConfigChave()
			const userCollectionRef = collection(db, "Feed")
			const querySnapshot = await getDocs(userCollectionRef)
			const result = querySnapshot.docs.map((doc) => doc.data())

			const filtrandoDadosData = (dataCompleta: any) => {
				const day = 0
				const month = 1
				const year = 2
				const hours = 0
				const min = 1
				const s = 2

				const limpandoData = dataCompleta.substr(0, 10).split("/")

				const resultData = limpandoData[year] + limpandoData[month] + limpandoData[day]

				const limpandoHora = dataCompleta.substr(11, 9).split(":")

				const resultHota =
					limpandoHora[hours].split(" ").join("") + limpandoHora[min] + limpandoHora[s]

				const DataHora = resultData + resultHota

				return DataHora
			}

			const response = result.sort((firstDate: any, secondDate: any) => {
				return filtrandoDadosData(firstDate.date) - filtrandoDadosData(secondDate.date)
			})

			return response.reverse()
		} catch (error: any) {
			console.log(error.response)
		}
	}
	public createPost = async (post: any) => {
		const postDB = this.toPostDBModel(post)
		const db = FirebaseConfigChave()
		// setDoc(doc(db, "Feed", postDB.id), postDB)
	}
}
