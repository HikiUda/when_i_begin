#include <stdio.h>
#include <stdlib.h>

typedef struct node
{
	int vertex;
	struct node *next;
} Node;

typedef struct graph
{
	int numVertices;
	Node **adjList;
} Graph;

Node *createNode(int v)
{
	Node *newNode = malloc(sizeof(Node));
	if (newNode == NULL)
	{
		return NULL;
	}
	newNode->vertex = v;
	newNode->next = NULL;

	return newNode;
}

Graph *createGraph(int vertisec)
{
	Graph *newGraph = malloc(sizeof(Graph));
	if (newGraph == NULL)
	{

		return NULL;
	}
	newGraph->numVertices = vertisec;
	newGraph->adjList = malloc(vertisec * sizeof(Node));
	if (newGraph->adjList == NULL)
	{
		free(newGraph);
		return NULL;
	}

	for (int i = 0; i < vertisec; i++)
	{
		newGraph->adjList[i] = NULL;
	}
	return newGraph;
}

void addEdge(Graph *graph, int from, int to)
{
	if (from < 0 || to < 0)
	{
		return;
	}
	if (graph->numVertices < from || graph->numVertices < to)
	{
		return;
	}
	Node *newNode = createNode(to);
	if (newNode == NULL)
	{
		return;
	}
	newNode->next = graph->adjList[from];
	graph->adjList[from] = newNode;
}

void printGraph(Graph *graph)
{
	printf("Graph:\n");
	for (int i = 0; i < graph->numVertices; i++)
	{
		Node *temp = graph->adjList[i];

		printf("\t%d", i);

		while (temp)
		{
			printf(" -> %d", temp->vertex);
			temp = temp->next;
		}
		printf("\n");
	}
}

int main()
{

	Graph *graph = createGraph(4);
	addEdge(graph, 0, 1);
	addEdge(graph, 0, 2);
	addEdge(graph, 2, 1);
	addEdge(graph, 1, 0);

	printGraph(graph);
	return 0;
}