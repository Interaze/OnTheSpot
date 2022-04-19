# System imports
import os
import sys

# Bosdyn imports
from bosdyn.api.graph_nav import map_pb2

# Load graphnav from local storage??
def load_map():
    """
    Load a map from the given file path.
    :param path: Path to the root directory of the map.
    :return: the graph, waypoints, waypoint snapshots and edge snapshots.
    """
    with open("/code/grpcPassthrough/graphs/testgraph", "rb") as graph_file:
        # Load the graph file and deserialize it. The graph file is a protobuf containing only the waypoints and the
        # edges between them.
        data = graph_file.read()
        current_graph = map_pb2.Graph()
        current_graph.ParseFromString(data)

        print(current_graph)

    return current_graph

# Transport graphnav to frontend for rendering
def transport_map():
    current_graph = load_map()

    # GRPC transport stuff



    # Done

if "__main__" == __name__:
    transport_map()