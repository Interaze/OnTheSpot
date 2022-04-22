from pywebvue import App
from pywebvue.modules import VTK

from vtkmodules.vtkFiltersSources import vtkConeSource
from vtkmodules.vtkRenderingCore import (
  vtkRenderer,
  vtkRenderWindow,
  vtkRenderWindowInteractor,
  vtkPolyDataMapper,
  vtkActor,
)
from vtkmodules.vtkInteractionStyle import vtkInteractorStyleSwitch

# -----------------------------------------------------------------------------
# Main
# /opt/paraview/bin/pvpython ./examples/.../app.py --port 1234 --virtual-env ~/Documents/code/Web/vue-py/py-lib
# -----------------------------------------------------------------------------

class Cone_Zone:
  # -----------------------------------------------------------------------------
  # Web App setup
  # -----------------------------------------------------------------------------
    def __init__(self, request):

        self.app = App("VTK Remote Rendering")
        self.app.state = {"resolution": 6}
        self.app.enable_module(VTK)

        # -----------------------------------------------------------------------------
        # VTK pipeline
        # -----------------------------------------------------------------------------

        self.renderer = vtkRenderer()
        self.renderWindow = vtkRenderWindow()
        self.renderWindow.AddRenderer(self.renderer)

        self.renderWindowInteractor = vtkRenderWindowInteractor()
        self.renderWindowInteractor.SetRenderWindow(self.renderWindow)
        self.renderWindowInteractor.GetInteractorStyle().SetCurrentStyleToTrackballCamera()
        self.renderWindowInteractor.EnableRenderOff()

        self.cone_source = vtkConeSource()
        self.mapper = vtkPolyDataMapper()
        self.actor = vtkActor()
        self.mapper.SetInputConnection(self.cone_source.GetOutputPort())
        self.actor.SetMapper(self.mapper)
        self.renderer.AddActor(self.actor)
        self.renderer.ResetCamera()
        self.renderWindow.Render()

    # -----------------------------------------------------------------------------
    # Callbacks
    # -----------------------------------------------------------------------------

    #@App.change("resolution")
    def update_cone(self):
        self.cone_source.SetResolution(self.app.get("resolution"))
        self.app.set("scene", VTK.scene(self.renderWindow))

    def get(self, request):
        self.app.on_ready = self.update_cone
        self.app.run_server()
