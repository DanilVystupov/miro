import { Link, href } from "react-router-dom"
import { ROUTES } from "@/shared/model/routes.ts"
import { rqClient } from "@/shared/api/instance.ts"
import { CONFIG } from "@/shared/model/config.ts"
import { queryClient } from "@/shared/api/query-client.ts"

function BoardsListPage() {
  const boardsQuery = rqClient.useQuery("get", "/boards")

  const createBoardMutation = rqClient.useMutation("post", "/boards", {
    onSettled: async () => {
      await queryClient.invalidateQueries(
        rqClient.queryOptions("get", "/boards"),
      )
    },
  })

  const deleteBoardMutation = rqClient.useMutation(
    "delete",
    "/boards/{boardId}",
    {
      onSettled: async () => {
        await queryClient.invalidateQueries(
          rqClient.queryOptions("get", "/boards"),
        )
      },
    },
  )

  return (
    <div>
      <h1>Boards list {CONFIG.API_BASE_URL}</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.target as HTMLFormElement)
          createBoardMutation.mutate({
            body: { name: formData.get("name") as string },
          })
        }}
      >
        <input type="text" name="name" placeholder="Введите текст" />

        <button disabled={createBoardMutation.isPending}>Create board</button>
      </form>

      {boardsQuery.data?.map((board) => (
        <div key={board.id}>
          <Link to={href(ROUTES.BOARD, { boardId: board.id })}>
            {board.name}
          </Link>

          <button
            disabled={deleteBoardMutation.isPending}
            onClick={() =>
              deleteBoardMutation.mutate({
                params: { path: { boardId: board.id } },
              })
            }
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}

export const Component = BoardsListPage
