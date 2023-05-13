  import { 
    FlatList,
    StyleSheet, 
    View 
} from 'react-native'

import React, { useState } from 'react'
import {
  LinearProgress,
  ListItem
} from '@rneui/themed'

import * as pessoaService from '../service/PessoaService'

const PessoaListComponent = () => {
  const [pessoas, setPessoas] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  const updateList = async () => {
    //buscar a lista de de pessoas com o PessoaService
    const pessoas = await pessoaService.obterLista()
    //atualizar a variável de estado pessoas, ordenada pelo nome
    const compareFn = (a, b) => {
      return a.nome > b.nome ? 1 : a.nome < b.nome ? -1 : 0
    }
    setPessoas(pessoas.data.items.sort(compareFn))
  }

  const onRefresh = () => {
    setRefreshing(true)
    //atualizar(pensar ainda como)
    updateList()
    setRefreshing(false)
  }
  return (
    <View>
      {
        pessoas.length > 0 ?
          <>
            <FlatList
              onRefresh={onRefresh}
              refreshing={refreshing} 
              data={pessoas}
              renderItem={(pessoa) => (
                <ListItem bottomDivider>
                  <ListItem.Content>
                    <ListItem.Title>
                      {pessoa.item.nome}
                    </ListItem.Title>
                    <ListItem.Subtitle>
                      {pessoa.item.hobby}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              )}
            />
          </>
        :
        <LinearProgress />
      }
    </View>
  )
}

export default PessoaListComponent

const styles = StyleSheet.create({})