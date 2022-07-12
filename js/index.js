const searchForm = document.getElementById('github-form')
const userList = document.getElementById('user-list')
const repoList = document.getElementById('repos-list')

const makeUserLi = (liText)=>{
    let li = document.createElement('li')
    // link.innerHTML = `<a href="https://github.com/${liText}">ProfileLink</a>`
    li.innerText = liText
    li.addEventListener('click', async ()=>{
        repoList.innerHTML=''
        const userReposReq = await fetch(`https://api.github.com/users/${liText}/repos`)
        const userRepos = await userReposReq.json()
        // console.log(userRepos)
        userRepos.map((repo)=>{
            let repoLi = document.createElement('li')
            repoLi.innerHTML = `<a href="${repo.html_url}">${repo.name}</a>`
            repoList.append(repoLi)
        })

    })


    userList.append(li)
}

searchForm.addEventListener('submit', async (e)=>{
    e.preventDefault()
    let req = await fetch(`https://api.github.com/search/users?q=${searchForm.search.value}`)
    let res = await req.json()
    // console.log(res.items)
    res.items.map((user)=>makeUserLi(user.login))
})